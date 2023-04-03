import { Request, RequestHandler, Response, Router } from 'express';
import { IFormModel } from './types/IFormModel';
type FormExpressApiParams = {
    maxFileSize?: number;
    multipartFormData?: boolean;
};
declare class FormExpressApi<TRecord extends Record<string, unknown>> {
    static create<TRecord extends Record<string, unknown>>(settings?: FormExpressApiParams): FormExpressApi<TRecord>;
    private middlewares;
    constructor({ multipartFormData, maxFileSize }?: FormExpressApiParams);
    model(model: IFormModel<TRecord> | ((req: Request, res: Response) => IFormModel<TRecord>)): this;
    getRouter(): Router;
    getData(middleware: RequestHandler | RequestHandler[]): this;
    submit(middleware: RequestHandler | RequestHandler[]): this;
    validate(middleware: RequestHandler | RequestHandler[]): this;
    private addMidelware;
    private getModel;
    private sendResult;
}
export default FormExpressApi;
