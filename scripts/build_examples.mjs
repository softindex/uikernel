#!/usr/bin/env zx
import 'zx/globals';
import fs from 'fs';

const dirNames = fs
  .readdirSync('./examples', { withFileTypes: true })
  .filter(dir => dir.isDirectory() && dir.name !== 'libs')
  .map(dir => dir.name);

// Fix of yarn error. Need to clear directories before `yarn install`
for (const dirName of dirNames) {
  await $`cd examples/${dirName} && rm -rf node_modules build .yarn`;
}

for (const dirName of dirNames) {
  await $`rm -rf _site/examples/${dirName}/* \
    && cd examples/${dirName} \
    && yarn install \
    && yarn run build \
    && mkdir -p ../../_site/examples/${dirName}\
    && mv -v build/* ../../_site/examples/${dirName} \
    && rm -rf node_modules .yarn build`;
}

await $`cd examples/final-example && cp src/main.css ../../_site/static/css/final-example.css`;
