#!/usr/bin/env zx
import 'zx/globals';
import fs from 'fs';

const dirNames = fs
  .readdirSync('./examples', { withFileTypes: true })
  .filter(dir => dir.isDirectory() && dir.name !== 'libs')
  .map(dir => dir.name);

for (const dirName of dirNames) {
  await $`rm -rf _site/examples/${dirName} \
      && cd examples/${dirName} \
      && npm install \
      && npm run build \
      && mkdir -p ../../_site/examples/${dirName}\
      && mv -v build/* ../../_site/examples/${dirName}`;
}

await $`cd examples/final-example && cp src/main.css ../../_site/static/css/final-example.css`;
