/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import express from 'express';
import multer from 'multer';
import httpError from 'http-errors';
import ValidationErrors from '../../common/validation/ValidationErrors';
import {asyncHandler, parseJson} from '../../common/utils';

const DEFAULT_MAX_FILE_SIZE = 104857600; // 100 MB

/**
 * Form Express API for Grid model interaction
 *
 * @return {GridExpressApi}
 * @constructor
 */
class GridExpressApi {
  static create(multipartFormData, maxFileSize, logger = console.log) {
    return new GridExpressApi(multipartFormData, maxFileSize, logger);
  }

  constructor(multipartFormData = false, maxFileSize = DEFAULT_MAX_FILE_SIZE, logger = console.log) {
    this.logger = logger;

    const upload = multer({
      limits: {
        fileSize: maxFileSize
      }
    });

    this.middlewares = {
      readGet: [asyncHandler(async (req, res, next) => {
        const settings = {};
        if (req.query.limit) {
          settings.limit = parseInt(req.query.limit);
        }
        if (req.query.offset) {
          settings.offset = parseInt(req.query.offset);
        }
        if (req.query.sort) {
          settings.sort = parseJson(req.query.sort, 'Invalid JSON in "sort"');
        }
        if (req.query.fields) {
          settings.fields = parseJson(req.query.fields, 'Invalid JSON in "fields"');
        } else {
          settings.fields = [];
        }
        if (req.query.extra) {
          settings.extra = parseJson(req.query.extra, 'Invalid JSON in "extra"');
        }
        if (req.query.filters) {
          settings.filters = parseJson(req.query.filters, 'Invalid JSON in "filters"');
        }
        await this._commonReadMiddleware(req, res, next, settings);
      })],
      readPost: [asyncHandler(async (req, res, next) => {
        const settings = {};
        if (req.body.limit) {
          settings.limit = parseInt(req.body.limit);
        }
        if (req.body.offset) {
          settings.offset = parseInt(req.body.offset);
        }
        if (req.body.sort) {
          settings.sort = req.body.sort;
        }
        if (req.body.fields) {
          settings.fields = req.body.fields;
        } else {
          settings.fields = [];
        }
        if (req.body.extra) {
          settings.extra = req.body.extra;
        }
        if (req.body.filters) {
          settings.filters = req.body.filters;
        }
        await this._commonReadMiddleware(req, res, next, settings);
      })],
      validate: [asyncHandler(async (req, res, next) => {
        const model = this._getModel(req, res);
        const result = this._result('validate');
        try {
          const errors = await model.isValidRecord(req.body.record, req.body.id);
          result(null, errors, req, res, next);
        } catch (err) {
          result(err, null, req, res, next);
        }
      })],
      getRecord: [asyncHandler(async (req, res, next) => {
        const cols = req.query.cols
          ? parseJson(req.query.cols, 'Invalid JSON in "cols"')
          : null;
        const recordId = req.params.recordId
          ? parseJson(req.params.recordId, 'Invalid JSON in "recordId"')
          : null;
        const model = this._getModel(req, res);
        const result = this._result('getRecord');
        try {
          const response = await model.getRecord(recordId, cols);
          result(null, response, req, res, next);
        } catch (err) {
          result(err, null, req, res, next);
        }
      })],
      update: [
        ...(multipartFormData ? [upload.any()] : []),
        asyncHandler(async (req, res, next) => {
          const model = this._getModel(req, res);
          const result = this._result('update');

          let body = req.body;

          if (multipartFormData) {
            const filesByRecordId = {};

            for (const {fieldname, buffer} of req.files) {
              const {recordId, field} = parseJson(
                decodeURI(fieldname),
                'Incorrect name for field containing file data'
              );
              if (!filesByRecordId[recordId]) {
                filesByRecordId[recordId] = {};
              }
              filesByRecordId[recordId][field] = buffer;
            }

            body = parseJson(body.rest, 'Incorrect "rest" json')
              .map(([recordId, record]) => {
                return [recordId, {
                  ...record,
                  ...filesByRecordId[recordId]
                }];
              });
          }

          if (!Array.isArray(body)) {
            throw httpError(422, 'Wrong data type to update');
          }

          try {
            const data = await model.update(body);
            result(null, data, req, res, next);
          } catch (err) {
            result(err, null, req, res, next);
          }
        })],
      create: [
        ...(multipartFormData ? [upload.any()] : []),
        asyncHandler(async (req, res, next) => {
          const model = this._getModel(req, res);
          const result = this._result('create');
          let body = req.body;

          if (multipartFormData) {
            body = parseJson(body.rest);

            for (const {fieldname, buffer} of req.files) {
              const parsedFieldName = parseJson(decodeURI(fieldname), 'Invalid JSON in field name');
              body[parsedFieldName] = buffer;
            }
          }

          try {
            const data = await model.create(body);
            result(null, data, req, res, next);
          } catch (err) {
            result(err, null, req, res, next);
          }
        })]
    };
  }

  /**
   * Specify Grid model
   *
   * @param   {Function|AbstractGridModel}  model   Grid model
   * @return  {GridExpressApi}
   */
  model(model) {
    if (typeof model === 'function') {
      this._getModel = model;
    } else {
      this._getModel = () => model;
    }
    return this;
  }

  getRouter() {
    return new express.Router()
      .get('/', this.middlewares.readGet)
      .post('/read', this.middlewares.readPost)
      .post('/validation', this.middlewares.validate)
      .get('/:recordId', this.middlewares.getRecord)
      .put('/', this.middlewares.update)
      .post('/', this.middlewares.create)
      .use((err, req, res, next) => {
        this._result()(err, null, req, res, next);
      });
  }

  read(middlewares) {
    this._addMidelwares('readGet', middlewares);
    this._addMidelwares('readPost', middlewares);
    return this;
  }

  validate(middlewares) {
    return this._addMidelwares('validate', middlewares);
  }

  getRecord(middlewares) {
    return this._addMidelwares('getRecord', middlewares);
  }

  update(middlewares) {
    return this._addMidelwares('update', middlewares);
  }

  create(middlewares) {
    return this._addMidelwares('create', middlewares);
  }

  _addMidelwares(method, middlewares) {
    if (!Array.isArray(middlewares)) {
      middlewares = [middlewares];
    }
    this.middlewares[method] = middlewares.concat(this.middlewares[method]);
    return this;
  }

  // Default implementation
  _getModel() {
    throw new Error('Model is not defined.');
  }

  _result(method) {
    if (method === 'update') {
      return (err, data, req, res, next) => {
        if (err) {
          return send(err, null, req, res, next);
        }

        data = data.reduce(
          (result, record) => {
            if (!record) {
              return result;
            }

            if (record[1] instanceof Error) {
              if ((record[1].statusCode >= 400 && record[1].statusCode < 500)) {
                result.errors.push(record);
              } else {
                this.logger(record[1]);
                result.errors.push([record[0], new Error('Unable to save changes. Please try again later')]);
              }
            } else if (record[1] instanceof ValidationErrors) {
              result.validation.push(record);
            } else {
              result.changes.push(record);
            }

            return result;
          },
          {changes: [], errors: [], validation: []}
        );

        send(null, data, req, res, next);
      };
    }

    if (method === 'create') {
      return (err, data, req, res, next) => {
        if (err) {
          if (!(err instanceof ValidationErrors)) {
            return send(err, null, req, res, next);
          }
          return send(null, {data: null, error: err}, req, res, next);
        }
        return send(null, {data: data, error: null}, req, res, next);
      };
    }

    return send;

    function send(err, data, req, res, next) {
      if (err) {
        next(err);
      } else {
        res.json(data);
      }
    }
  }

  async _commonReadMiddleware(req, res, next, settings) {
    const model = this._getModel(req, res);
    const result = this._result('read');
    try {
      const response = await model.read(settings);
      result(null, response, req, res, next);
    } catch (err) {
      result(err, null, req, res, next);
    }
  }
}

export default GridExpressApi;
