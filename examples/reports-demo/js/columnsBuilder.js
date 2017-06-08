/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

function columnsBuilder(dimensions, measures) {
  var columns = {};

  ['date', 'publisher', 'advertiser', 'campaign', 'banner'].forEach(function (dimension) {
    if (dimensions.indexOf(dimension) >= 0) {
      columns[dimension] = {
        name: dimensionNames[dimension],
        sortCycle: ['desc', 'asc', 'default'],
        render: [function (record) {
          // Our cube returned string designations of advertisers and campaigns
          // so we can display it instead of the identifier
          switch (dimension) {
            case 'advertiser': return record.advertiserName;
            case 'campaign': return record.campaignName;
          }
          return record[dimension];
        }]
      };
    }
  });

  ['impressions', 'clicks', 'conversions', 'revenue'].forEach(function (measure) {
    if (measures.indexOf(measure) >= 0) {
      columns[measure] = {
        name: _.capitalize(measure),
        sortCycle: ['desc', 'asc', 'default'],
        render: [measure, function (record) {
          if (measure === 'revenue') {
            return record[measure].toFixed(2);
          }
          return record[measure];
        }]
      };
    }
  });

  return columns;
}
