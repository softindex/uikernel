import { Request, RequestHandler, Response, Router } from 'express';
import { IGridModel } from './types/IGridModel';
declare class GridExpressApi<TKey, TRecord extends Record<string, unknown>, TFilters> {
    static create<TKey, TRecord extends Record<string, unknown>, TFilters>(multipartFormData?: boolean, maxFileSize?: number): GridExpressApi<TKey, TRecord, TFilters>;
    private middlewares;
    constructor(multipartFormData: boolean, maxFileSize: number);
    model(model: IGridModel<TKey, TRecord, TFilters> | ((req: Request, res: Response) => IGridModel<TKey, TRecord, TFilters>)): this;
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
