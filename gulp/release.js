/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs';
import sequence from 'gulp-sequence';
import {spawn} from 'child_process';
import {argv} from 'yargs';
import pkg from '../package.json';

const repo = argv.repo || 'origin';
const tag = 'v' + pkg.version;

function exec(cmd, params, cb) {
  spawn(cmd, params).on('exit', cb);
}

function assertOutputIsEmpty(cmd, options, errorMsg, cb) {
  const p = spawn(cmd, options);
  let hasOutput = false;

  p.on('exit', function () {
    if (hasOutput) {
      throw Error(errorMsg);
    }
    cb();
  });

  p.stdout.on('data', function () {
    hasOutput = true;
    p.kill();
  });
}

function getIgnoreData(cb) {
  fs.readFile('.gitignore', 'utf-8', function (err, ignoreData) {
    if (err) {
      throw err;
    }
    cb(ignoreData);
  });
}

function setIgnoreData(newIgnoreData, cb) {
  fs.writeFile('.gitignore', newIgnoreData, function (err) {
    if (err) {
      throw err;
    }
    cb();
  });
}

function filterIgnoreData(ignoreData) {
  return ignoreData.replace(/(^|\n)(lib|dist)$/gm, '');
}

function release(cb) {
  assertOutputIsEmpty('git', ['status', '-s'], 'Commit repo changes first', function () {
    assertOutputIsEmpty('git', ['tag', '-l', tag], 'Tag already exists', function () {
      sequence('bundle')(function () {
        getIgnoreData(function (ignoreData) {
          const newIgnoreData = filterIgnoreData(ignoreData);
          setIgnoreData(newIgnoreData, function () {
            exec('git', ['add', '.'], function () { // stage all
              exec('git', ['commit', '-m', tag], function () { // commit
                exec('git', ['tag', '-a', tag, '-m', tag], function () { // add tag
                  exec('git', ['push', '--tags', repo], function () { // push tags
                    exec('git', ['reset', '--hard', 'HEAD~1'], cb); // reset head
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

export default release;
