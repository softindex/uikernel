/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Request, RequestHandler, Response, Router} from 'express';
import httpError from 'http-errors';
import multer from 'multer';
import asyncServerRouteHandler from '../../common/asyncServerRouteHandler';
import parseJson from '../../common/parseJson';
import ValidationErrors from '../../validation/ValidationErrors';
import {
  IGridModelReadParams,
  IGridModel,
  IGridModelSortMode,
  IGridModelUpdateResult
} from './types/IGridModel';
import {JsonGridApiResult} from './types/JsonGridApiResult';

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
class GridExpressApi<TKey, TRecord extends Record<string, unknown>, TFilters> {
  static create<TKey, TRecord extends Record<string, unknown>, TFilters>(
    multipartFormData = false,
    maxFileSize = DEFAULT_MAX_FILE_SIZE
  ): GridExpressApi<TKey, TRecord, TFilters> {
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
          const settings: IGridModelReadParams<TKey, TRecord, TFilters> = {
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
              keyof TRecord & string,
              IGridModelSortMode
            ][];
          }

          if (req.query.fields) {
            settings.fields = parseJson(req.query.fields, 'Invalid JSON in "fields"') as (keyof TRecord &
              string)[];
          }

          if (req.query.extra) {
            settings.extra = parseJson(req.query.extra, 'Invalid JSON in "extra"') as TKey[];
          }

          if (req.query.filters) {
            settings.filters = parseJson(req.query.filters, 'Invalid JSON in "filters"') as TFilters;
          }

          const model = this.getModel(req, res);
          const result = await model.read(settings);

          this.sendResult<'read'>(res, result);
        })
      ],
      readPost: [
        asyncServerRouteHandler(async (req, res) => {
          const settings: IGridModelReadParams<TKey, TRecord, TFilters> = {
            fields: []
          };
          const body = req.body as Partial<IGridModelReadParams<TKey, TRecord, TFilters>>;

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
          const body = req.body as {id?: TKey; record: Partial<TRecord>};
          const errors = await model.isValidRecord(body.record, body.id);
          this.sendResult<'validate'>(res, errors.toJSON());
        })
      ],
      getRecord: [
        asyncServerRouteHandler(async (req, res) => {
          const cols = parseJson(req.query.cols, 'Invalid JSON in "cols"') as (keyof TRecord & string)[];
          const recordId = parseJson(req.params.recordId, 'Invalid JSON in "recordId"') as TKey;
          const model = this.getModel(req, res);
          const result = await model.getRecord(recordId, cols);

          this.sendResult<'getRecord'>(res, result);
        })
      ],
      update: [
        ...(multipartFormData ? [upload.any()] : []),
        asyncServerRouteHandler(async (req, res) => {
          const model = this.getModel(req, res);
          let body: [TKey, Partial<TRecord>][];

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

            body = (parseJson(req.body.rest, 'Incorrect "rest" json') as [TKey, Partial<TRecord>][]).map(
              ([recordId, record]) => {
                return [
                  recordId,
                  {
                    ...record,
                    ...(filesByRecordId[recordId as string] as Partial<TRecord>)
                  }
                ];
              }
            );
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
          let body: Partial<TRecord>;

          if (multipartFormData) {
            body = parseJson(req.body.rest) as Partial<TRecord>;

            for (const {fieldname, buffer} of req.files as Express.Multer.File[]) {
              const parsedFieldName = parseJson(
                decodeURI(fieldname),
                'Invalid JSON in field name'
              ) as keyof TRecord & string;
              // @ts-expect-error: TS2322 Type 'Buffer' is not assignable to type 'TRecord[keyof TRecord & string]'
              body[parsedFieldName] = buffer;
            }
          } else {
            body = req.body;
          }

          let result: TKey | undefined;
          let validationErrors: ValidationErrors<keyof TRecord & string> | undefined;
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
            this.sendResult<'create'>(res, {data: result as TKey, error: null});
          }
        })
      ]
    };
  }

  /**
   * Specify Grid model
   */
  model(
    model:
      | IGridModel<TKey, TRecord, TFilters>
      | ((req: Request, res: Response) => IGridModel<TKey, TRecord, TFilters>)
  ): this {
    if (typeof model === 'function') {
      this.getModel = model;
    } else {
      this.getModel = () => model;
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
    this.addMidelwares('readGet', middlewares);
    this.addMidelwares('readPost', middlewares);
    return this;
  }

  validate(middlewares: RequestHandler | RequestHandler[]): this {
    return this.addMidelwares('validate', middlewares);
  }

  getRecord(middlewares: RequestHandler | RequestHandler[]): this {
    return this.addMidelwares('getRecord', middlewares);
  }

  update(middlewares: RequestHandler | RequestHandler[]): this {
    return this.addMidelwares('update', middlewares);
  }

  create(middlewares: RequestHandler | RequestHandler[]): this {
    return this.addMidelwares('create', middlewares);
  }

  private addMidelwares(
    method: keyof GridExpressApiMiddlewares,
    middleware: RequestHandler | RequestHandler[]
  ): this {
    const middlewares = Array.isArray(middleware) ? middleware : [middleware];
    this.middlewares[method] = middlewares.concat(this.middlewares[method]);
    return this;
  }

  // Default implementation
  private getModel(_req: Request, _res: Response): IGridModel<TKey, TRecord, TFilters> {
    throw new Error('Model is not defined.');
  }

  private transformUpdateResult(
    data: IGridModelUpdateResult<TKey, TRecord>
  ): JsonGridApiResult<TKey, TRecord>['update'] {
    const result: JsonGridApiResult<TKey, TRecord>['update'] = {
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

  private sendResult<TMethodName extends keyof JsonGridApiResult<TKey, TRecord>>(
    res: Response,
    result: JsonGridApiResult<TKey, TRecord>[TMethodName]
  ): void {
    res.json(result);
  }
}

export default GridExpressApi;
