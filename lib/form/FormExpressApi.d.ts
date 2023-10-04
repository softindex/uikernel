import type { Request, RequestHandler, Response } from 'express';
import { Router } from 'express';
import type { IFormModel } from './types/IFormModel';
type FormExpressApiParams = {
    maxFileSize?: number;
    multipartFormData?: boolean;
};
declare class FormExpressApi {
    static create(settings?: FormExpressApiParams): FormExpressApi;
    private middlewares;
    constructor({ multipartFormData, maxFileSize }?: FormExpressApiParams);
    model<TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord>(model: IFormModel<TEditableRecord, TRecord> | ((req: Request, res: Response) => IFormModel<TEditableRecord, TRecord>)): this;
    getRouter(): Router;
    getData(middleware: RequestHandler | RequestHandler[]): this;
    submit(middleware: RequestHandler | RequestHandler[]): this;
    validate(middleware: RequestHandler | RequestHandler[]): this;
    private addMiddleware;
    private getModel;
    private sendResult;
}
export default FormExpressApi;
