/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

type JsonExportRunnerParams<TRecord extends {}> = {
  records: Partial<TRecord>[];
  totals: Partial<TRecord>;
};

type JsonExportRunnerResult<TRecord extends {}> = {
  data: {
    records: Partial<TRecord>[];
    totals: Partial<TRecord>;
  };
  mime: 'application/json';
};

export type JsonExportRunner = <TRecord extends {}>(
  params: JsonExportRunnerParams<TRecord>
) => Promise<JsonExportRunnerResult<TRecord>>;

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
