#!/usr/bin/env zx
import 'zx/globals';
import fs from 'fs';

const CLIENT_SERVER_EXAMPLES = ['server-example']

const dirNames = fs
  .readdirSync('./examples', { withFileTypes: true })
  .filter(dir => dir.isDirectory() && dir.name !== 'libs' && !CLIENT_SERVER_EXAMPLES.includes(dir.name))
  .map(dir => dir.name);

// Fix of yarn error. Need to clear directories before `yarn install`
for (const dirName of dirNames) {
  await $`cd examples/${dirName} && rm -rf node_modules build .yarn`;
}
for (const dirName of CLIENT_SERVER_EXAMPLES) {
  await $`cd examples/${dirName}/client && rm -rf node_modules build .yarn`;
  await $`cd examples/${dirName}/server && rm -rf node_modules build .yarn`;
}

for (const dirName of dirNames) {
  await $`rm -rf _site/examples/${dirName}/* \
    && cd examples/${dirName} \
    && yarn install \
    && yarn run build \
    && mkdir -p ../../${dirName.includes('/') ? '../' : ''}_site/examples/${dirName}\
    && mv -v build/* ../../${dirName.includes('/') ? '../' : ''}_site/examples/${dirName} \
    && rm -rf node_modules .yarn build`;
}


for (const dirName of CLIENT_SERVER_EXAMPLES) {
  await $`rm -rf _site/examples/${dirName}`;
  await $`cd examples/${dirName}/client \
    && yarn install \
    && yarn run build \
    && mkdir -p ../../_site/examples/${dirName}/client\
    && mv -v build/* ../../_site/examples/${dirName}/client \
    && rm -rf node_modules .yarn build`;
  await $`cd examples/${dirName}/server \
    && yarn install \
    && yarn run build \
    && mkdir -p ../../_site/examples/${dirName}/server\
    && mv -v build/* ../../_site/examples/${dirName}/server \
    && rm -rf node_modules .yarn build`;
}

await $`cd examples/final-example && cp src/main.css ../../_site/static/css/final-example.css`;
