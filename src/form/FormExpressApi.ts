/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {Request, RequestHandler, Response} from 'express';
import {Router} from 'express';
import multer from 'multer';
import {assertNonNullish} from '../common/assert';
import asyncServerRouteHandler from '../common/asyncServerRouteHandler';
import parseJson from '../common/parseJson';
import ValidationErrors from '../validation/ValidationErrors';
import type {IFormModel} from './types/IFormModel';
import type {JsonFormApiResult} from './types/JsonFormApiResult';

const DEFAULT_MAX_FILE_SIZE = 104857600; // 100 MB

type FormExpressApiParams = {
  maxFileSize?: number;
  multipartFormData?: boolean;
};

type FormExpressApiMiddlewares = {
  getData: RequestHandler[];
  getDataPost: RequestHandler[];
  submit: RequestHandler[];
  validate: RequestHandler[];
};

class FormExpressApi {
  static create(settings: FormExpressApiParams = {}): FormExpressApi {
    return new FormExpressApi(settings);
  }

  private middlewares: FormExpressApiMiddlewares = {
    getData: [],
    getDataPost: [],
    submit: [],
    validate: []
  };

  constructor({multipartFormData = false, maxFileSize = DEFAULT_MAX_FILE_SIZE}: FormExpressApiParams = {}) {
    const upload = multer({
      limits: {
        fileSize: maxFileSize
      }
    });

    this.addMiddleware(
      'getData',
      asyncServerRouteHandler(async (req, res) => {
        const fields = req.query.fields ? (parseJson(req.query.fields.toString()) as string[]) : undefined;
        const result = await this.getModel(req, res).getData(fields);
        this.sendResult<'getData'>(res, result);
      })
    );

    this.addMiddleware(
      'getDataPost',
      asyncServerRouteHandler(async (req, res) => {
        const {fields} = req.body as {fields: string[] | null | undefined};
        const result = await this.getModel(req, res).getData(fields ?? undefined);
        this.sendResult<'getData'>(res, result);
      })
    );

    this.addMiddleware('submit', [
      ...(multipartFormData ? [upload.any()] : []),
      asyncServerRouteHandler(async (req, res) => {
        const model = this.getModel(req, res);
        let body: Record<string, unknown>;

        if (multipartFormData) {
          body = parseJson(req.body.rest) as Record<string, unknown>;
          const files = req.files as Express.Multer.File[];

          for (const {fieldname, buffer} of files) {
            const parsedFieldName = parseJson(decodeURI(fieldname), 'Invalid JSON in field name') as string;
            body[parsedFieldName] = buffer;
          }
        } else {
          body = req.body;
        }

        let data: Record<string, unknown> | undefined;
        let validationErrors: ValidationErrors<string> | undefined;
        try {
          data = await model.submit(body);
        } catch (error) {
          if (!(error instanceof ValidationErrors)) {
            throw error;
          }

          validationErrors = error;
        }

        if (validationErrors) {
          this.sendResult<'submit'>(res, {data: null, error: validationErrors.toJSON()});
        } else {
          assertNonNullish<object | undefined>(data, '"data" unknown');
          this.sendResult<'submit'>(res, {data, error: null});
        }
      })
    ]);

    this.addMiddleware(
      'validate',
      asyncServerRouteHandler(async (req, res) => {
        const model = this.getModel(req, res);
        const validationErrors = await model.isValidRecord(req.body as Record<string, unknown>);
        this.sendResult<'validate'>(res, validationErrors.toJSON());
      })
    );
  }

  model<TRecord extends Record<string, unknown>>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    model: IFormModel<TRecord> | ((req: Request, res: Response<unknown, any>) => IFormModel<TRecord>)
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
      .get('/', this.middlewares.getData) // Deprecated
      .post('/', this.middlewares.submit)
      .get('/data', this.middlewares.getData)
      .post('/data', this.middlewares.getDataPost)
      .post('/validation', this.middlewares.validate);
  }

  getData(middleware: RequestHandler | RequestHandler[]): this {
    return this.addMiddleware('getData', middleware);
  }

  submit(middleware: RequestHandler | RequestHandler[]): this {
    return this.addMiddleware('submit', middleware);
  }

  validate(middleware: RequestHandler | RequestHandler[]): this {
    return this.addMiddleware('validate', middleware);
  }

  private addMiddleware(
    method: keyof FormExpressApiMiddlewares,
    middleware: RequestHandler | RequestHandler[]
  ): this {
    const middlewares = Array.isArray(middleware) ? middleware : [middleware];

    this.middlewares[method] = middlewares.concat(this.middlewares[method]);
    return this;
  }

  // Default implementation
  private getModel(_req: Request, _res: Response): IFormModel<Record<string, unknown>> {
    throw new Error('Model is not defined.');
  }

  private sendResult<TMethodName extends keyof JsonFormApiResult<Record<string, unknown>>>(
    res: Response,
    result: JsonFormApiResult<Record<string, unknown>>[TMethodName]
  ): void {
    res.json(result);
  }
}

export default FormExpressApi;
