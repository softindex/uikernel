/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

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

export type JsonExportRunner = <TColumn extends string>(
  params: JsonExportRunnerParams<TColumn>
) => Promise<JsonExportRunnerResult<TColumn>>;

const toJSON: JsonExportRunner = async (data) => {
  return {
    mime: 'application/json',
    data: {
      records: data.records,
      totals: data.totals
    }
  };
};

export default toJSON;
