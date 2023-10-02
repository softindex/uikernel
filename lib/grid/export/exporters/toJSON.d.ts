type JsonExportRunnerParams<TColumn extends string> = {
    records: Partial<Record<TColumn, string>>[];
    totals?: Partial<Record<TColumn, string>>;
};
type JsonExportRunnerResult<TColumn extends string> = {
    data: {
        records: Partial<Record<TColumn, string>>[];
        totals?: Partial<Record<TColumn, string>>;
    };
    mime: 'application/json';
};
export type JsonExportRunner = <TColumn extends string>(params: JsonExportRunnerParams<TColumn>) => Promise<JsonExportRunnerResult<TColumn>>;
declare const toJSON: JsonExportRunner;
export default toJSON;
