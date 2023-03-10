/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Request, RequestHandler, Response, Router} from 'express';
import multer from 'multer';
import {assertNonNullish} from '../common/assert';
import asyncServerRouteHandler from '../common/asyncServerRouteHandler';
import parseJson from '../common/parseJson';
import ValidationErrors from '../validation/ValidationErrors';
import {IFormModel} from './types/IFormModel';
import {JsonFormApiResult} from './types/JsonFormApiResult';

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

class FormExpressApi<TRecord extends Record<string, unknown>> {
  static create<TRecord extends Record<string, unknown>>(
    settings: FormExpressApiParams = {}
  ): FormExpressApi<TRecord> {
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

    this.addMidelware(
      'getData',
      asyncServerRouteHandler(async (req, res) => {
        const fields = req.query.fields
          ? (parseJson(req.query.fields.toString()) as (keyof TRecord & string)[])
          : undefined;
        const result = await this.getModel(req, res).getData(fields);
        this.sendResult<'getData'>(res, result);
      })
    );

    this.addMidelware(
      'getDataPost',
      asyncServerRouteHandler(async (req, res) => {
        const {fields} = req.body as {fields: (keyof TRecord & string)[] | null | undefined};
        const result = await this.getModel(req, res).getData(fields ?? undefined);
        this.sendResult<'getData'>(res, result);
      })
    );

    this.addMidelware('submit', [
      ...(multipartFormData ? [upload.any()] : []),
      asyncServerRouteHandler(async (req, res) => {
        const model = this.getModel(req, res);
        let body: Partial<TRecord>;

        if (multipartFormData) {
          body = parseJson(req.body.rest) as Partial<TRecord>;
          const files = req.files as Express.Multer.File[];

          for (const {fieldname, buffer} of files) {
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

        let data: Partial<TRecord> | undefined;
        let validationErrors: ValidationErrors<keyof TRecord & string> | undefined;
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

    this.addMidelware(
      'validate',
      asyncServerRouteHandler(async (req, res) => {
        const model = this.getModel(req, res);
        const validationErrors = await model.isValidRecord(req.body as Partial<TRecord>);
        this.sendResult<'validate'>(res, validationErrors.toJSON());
      })
    );
  }

  model(model: IFormModel<TRecord> | ((req: Request, res: Response) => IFormModel<TRecord>)): this {
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
    return this.addMidelware('getData', middleware);
  }

  submit(middleware: RequestHandler | RequestHandler[]): this {
    return this.addMidelware('submit', middleware);
  }

  validate(middleware: RequestHandler | RequestHandler[]): this {
    return this.addMidelware('validate', middleware);
  }

  private addMidelware(
    method: keyof FormExpressApiMiddlewares,
    middleware: RequestHandler | RequestHandler[]
  ): this {
    const middlewares = Array.isArray(middleware) ? middleware : [middleware];

    this.middlewares[method] = middlewares.concat(this.middlewares[method]);
    return this;
  }

  // Default implementation
  private getModel(_req: Request, _res: Response): IFormModel<TRecord> {
    throw new Error('Model is not defined.');
  }

  private sendResult<TMethodName extends keyof JsonFormApiResult<TRecord>>(
    res: Response,
    result: JsonFormApiResult<TRecord>[TMethodName]
  ): void {
    res.json(result);
  }
}

export default FormExpressApi;
