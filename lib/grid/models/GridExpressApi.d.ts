import type { Request, RequestHandler, Response } from 'express';
import { Router } from 'express';
import type { IGridModel } from './types/IGridModel';
declare class GridExpressApi {
    static create(multipartFormData?: boolean, maxFileSize?: number): GridExpressApi;
    private middlewares;
    constructor(multipartFormData: boolean, maxFileSize: number);
    model<TKey, TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord, TFilter>(model: IGridModel<TKey, TEditableRecord, TRecord, TFilter> | ((req: Request, res: Response) => IGridModel<TKey, TEditableRecord, TRecord, TFilter>)): this;
    getRouter(): Router;
    read(middlewares: RequestHandler | RequestHandler[]): this;
    validate(middlewares: RequestHandler | RequestHandler[]): this;
    getRecord(middlewares: RequestHandler | RequestHandler[]): this;
    update(middlewares: RequestHandler | RequestHandler[]): this;
    create(middlewares: RequestHandler | RequestHandler[]): this;
    private addMiddlewares;
    private getModel;
    private transformUpdateResult;
    private sendResult;
}
export default GridExpressApi;
