import type { default as stringify } from 'csv-stringify';
export type CSVExportRunnerParams<TColumn extends string> = {
    columns: stringify.Options['columns'];
    records: Partial<Record<TColumn, string>>[];
    totals?: Partial<Record<TColumn, string>>;
};
export type CSVExportRunnerResult = {
    data: string;
    mime: 'text/csv';
};
export type CSVExportRunner = <TColumn extends string>(params: CSVExportRunnerParams<TColumn>) => Promise<CSVExportRunnerResult>;
declare const toCSV: CSVExportRunner;
export default toCSV;
