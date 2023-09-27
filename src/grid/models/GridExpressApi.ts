/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {Request, RequestHandler, Response} from 'express';
import {Router} from 'express';
import httpError from 'http-errors';
import multer from 'multer';
import asyncServerRouteHandler from '../../common/asyncServerRouteHandler';
import parseJson from '../../common/parseJson';
import ValidationErrors from '../../validation/ValidationErrors';
import type {
  GridModelReadParams,
  IGridModel,
  GridModelSortMode,
  GridModelUpdateResult
} from './types/IGridModel';
import type {JsonGridApiResult} from './types/JsonGridApiResult';

const DEFAULT_MAX_FILE_SIZE = 104857600; // 100 MB

type GridExpressApiMiddlewares = {
  create: RequestHandler[];
  getRecord: RequestHandler[];
  readGet: RequestHandler[];
  readPost: RequestHandler[];
  update: RequestHandler[];
  validate: RequestHandler[];
};

/**
 * Form Express API for Grid model interaction
 */
class GridExpressApi {
  static create(multipartFormData = false, maxFileSize = DEFAULT_MAX_FILE_SIZE): GridExpressApi {
    return new GridExpressApi(multipartFormData, maxFileSize);
  }

  private middlewares: GridExpressApiMiddlewares;

  constructor(multipartFormData: boolean, maxFileSize: number) {
    const upload = multer({
      limits: {
        fileSize: maxFileSize
      }
    });

    this.middlewares = {
      readGet: [
        asyncServerRouteHandler(async (req, res) => {
          const settings: GridModelReadParams<unknown, Record<string, unknown>, string, unknown> = {
            fields: []
          };

          if (req.query.limit) {
            settings.limit = parseInt(req.query.limit.toString(), 10);
          }

          if (req.query.offset) {
            settings.offset = parseInt(req.query.offset.toString(), 10);
          }

          if (req.query.sort) {
            settings.sort = parseJson(req.query.sort, 'Invalid JSON in "sort"') as [
              string,
              GridModelSortMode
            ][];
          }

          if (req.query.fields) {
            settings.fields = parseJson(req.query.fields, 'Invalid JSON in "fields"') as string[];
          }

          if (req.query.extra) {
            settings.extra = parseJson(req.query.extra, 'Invalid JSON in "extra"') as unknown[];
          }

          if (req.query.filters) {
            settings.filters = parseJson(req.query.filters, 'Invalid JSON in "filters"');
          }

          const model = this.getModel(req, res);
          const result = await model.read(settings);

          this.sendResult<'read'>(res, result);
        })
      ],
      readPost: [
        asyncServerRouteHandler(async (req, res) => {
          const settings: GridModelReadParams<unknown, Record<string, unknown>, string, unknown> = {
            fields: []
          };
          const body = req.body as Partial<
            GridModelReadParams<unknown, Record<string, unknown>, string, unknown>
          >;

          if (body.limit) {
            settings.limit = parseInt(String(body.limit), 10);
          }

          if (body.offset) {
            settings.offset = parseInt(String(body.offset), 10);
          }

          if (body.sort) {
            settings.sort = body.sort;
          }

          if (body.fields) {
            settings.fields = body.fields;
          }

          if (body.extra) {
            settings.extra = body.extra;
          }

          if (body.filters) {
            settings.filters = body.filters;
          }

          const model = this.getModel(req, res);
          const result = await model.read(settings);

          this.sendResult<'read'>(res, result);
        })
      ],
      validate: [
        asyncServerRouteHandler(async (req, res) => {
          const model = this.getModel(req, res);
          const body = req.body as {id?: unknown; record: Record<string, unknown>};
          const errors = await model.isValidRecord(body.record, body.id);
          this.sendResult<'validate'>(res, errors.toJSON());
        })
      ],
      getRecord: [
        asyncServerRouteHandler(async (req, res) => {
          const cols = parseJson(req.query.cols, 'Invalid JSON in "cols"') as string[];
          const recordId = parseJson(req.params.recordId, 'Invalid JSON in "recordId"');
          const model = this.getModel(req, res);
          const result = await model.getRecord(recordId, cols);

          this.sendResult<'getRecord'>(res, result);
        })
      ],
      update: [
        ...(multipartFormData ? [upload.any()] : []),
        asyncServerRouteHandler(async (req, res) => {
          const model = this.getModel(req, res);
          let body: [unknown, Record<string, unknown>][];

          if (multipartFormData) {
            const filesByRecordId: Record<string, Record<string, Buffer>> = {};

            for (const {fieldname, buffer} of req.files as Express.Multer.File[]) {
              const {recordId, field} = parseJson(
                decodeURI(fieldname),
                'Incorrect name for field containing file data'
              ) as {field: string; recordId: string};

              const recordFiles = filesByRecordId[recordId] ?? {};
              recordFiles[field] = buffer;
              filesByRecordId[recordId] = recordFiles;
            }

            body = (
              parseJson(req.body.rest, 'Incorrect "rest" json') as [unknown, Record<string, unknown>][]
            ).map(([recordId, record]) => {
              return [
                recordId,
                {
                  ...record,
                  ...(filesByRecordId[recordId as string] as Record<string, unknown>)
                }
              ];
            });
          } else {
            body = req.body;
          }

          if (!Array.isArray(body)) {
            throw httpError(422, 'Wrong data type to update');
          }

          const data = await model.update(body);
          this.sendResult<'update'>(res, this.transformUpdateResult(data));
        })
      ],
      create: [
        ...(multipartFormData ? [upload.any()] : []),
        asyncServerRouteHandler(async (req, res) => {
          const model = this.getModel(req, res);
          let body: Record<string, unknown>;

          if (multipartFormData) {
            body = parseJson(req.body.rest) as Record<string, unknown>;

            for (const {fieldname, buffer} of req.files as Express.Multer.File[]) {
              const parsedFieldName = parseJson(decodeURI(fieldname), 'Invalid JSON in field name') as string;
              body[parsedFieldName] = buffer;
            }
          } else {
            body = req.body;
          }

          let result: unknown | undefined;
          let validationErrors: ValidationErrors<string> | undefined;
          try {
            result = await model.create(body);
          } catch (error) {
            if (!(error instanceof ValidationErrors)) {
              throw error;
            }

            validationErrors = error;
          }

          if (validationErrors) {
            this.sendResult<'create'>(res, {data: null, error: validationErrors.toJSON()});
          } else {
            this.sendResult<'create'>(res, {data: result, error: null});
          }
        })
      ]
    };
  }

  /**
   * Specify Grid model
   */
  model<TKey, TRecord extends Record<string, unknown>, TFilter>(
    model:
      | IGridModel<TKey, TRecord, TFilter>
      | ((req: Request, res: Response) => IGridModel<TKey, TRecord, TFilter>)
  ): this {
    if (typeof model === 'function') {
      this.getModel = model as unknown as () => IGridModel<unknown, Record<string, unknown>, unknown>;
    } else {
      this.getModel = () => model as IGridModel<unknown, Record<string, unknown>, unknown>;
    }

    return this;
  }

  getRouter(): Router {
    return Router()
      .get('/', this.middlewares.readGet)
      .post('/read', this.middlewares.readPost)
      .post('/validation', this.middlewares.validate)
      .get('/:recordId', this.middlewares.getRecord)
      .put('/', this.middlewares.update)
      .post('/', this.middlewares.create);
  }

  read(middlewares: RequestHandler | RequestHandler[]): this {
    this.addMiddlewares('readGet', middlewares);
    this.addMiddlewares('readPost', middlewares);
    return this;
  }

  validate(middlewares: RequestHandler | RequestHandler[]): this {
    return this.addMiddlewares('validate', middlewares);
  }

  getRecord(middlewares: RequestHandler | RequestHandler[]): this {
    return this.addMiddlewares('getRecord', middlewares);
  }

  update(middlewares: RequestHandler | RequestHandler[]): this {
    return this.addMiddlewares('update', middlewares);
  }

  create(middlewares: RequestHandler | RequestHandler[]): this {
    return this.addMiddlewares('create', middlewares);
  }

  private addMiddlewares(
    method: keyof GridExpressApiMiddlewares,
    middleware: RequestHandler | RequestHandler[]
  ): this {
    const middlewares = Array.isArray(middleware) ? middleware : [middleware];
    this.middlewares[method] = middlewares.concat(this.middlewares[method]);
    return this;
  }

  // Default implementation
  private getModel(_req: Request, _res: Response): IGridModel<unknown, Record<string, unknown>, unknown> {
    throw new Error('Model is not defined.');
  }

  private transformUpdateResult(
    data: GridModelUpdateResult<unknown, Record<string, unknown>>
  ): JsonGridApiResult<unknown, Record<string, unknown>>['update'] {
    const result: JsonGridApiResult<unknown, Record<string, unknown>>['update'] = {
      changes: [],
      errors: [],
      validation: []
    };

    return data.reduce((result, [key, record]) => {
      if (record instanceof Error) {
        result.errors.push([key, record]);
      } else if (record instanceof ValidationErrors) {
        result.validation.push([key, record.toJSON()]);
      } else {
        result.changes.push([key, record]);
      }

      return result;
    }, result);
  }

  private sendResult<TMethodName extends keyof JsonGridApiResult<unknown, Record<string, unknown>>>(
    res: Response,
    result: JsonGridApiResult<unknown, Record<string, unknown>>[TMethodName]
  ): void {
    res.json(result);
  }
}

export default GridExpressApi;
