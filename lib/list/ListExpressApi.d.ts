import { Request, RequestHandler, Response, Router } from 'express';
import { IListModel } from './types/IListModel';
declare class ListExpressApi<TKey, TMetadata extends Record<string, unknown>> {
    static create<TKey, TMetadata extends Record<string, unknown>>(): ListExpressApi<TKey, TMetadata>;
    private middlewares;
    model(model: IListModel<TKey, TMetadata> | ((req: Request, res: Response) => IListModel<TKey, TMetadata>)): this;
    getRouter(): Router;
    read(middleware: RequestHandler | RequestHandler[]): this;
    getLabel(middleware: RequestHandler | RequestHandler[]): this;
    private getModel;
    private sendResult;
}
export default ListExpressApi;
