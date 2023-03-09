#!/usr/bin/env zx
import 'zx/globals';
import fs from 'fs';

try {
  const dirNames = fs
    .readdirSync('./examples', { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name != 'libs')
    .map(d => d.name);
  for (const dirName of dirNames) {
    await Promise.all([
      $`rm -rf _site/examples/${dirName}/* \
        && cd examples/${dirName} \
        && npm i \
        && npm run build \
        && rm -rf node_modules`,
    ]);
  }
} catch (p) {
  console.error(`Exit code: ${p.exitCode}`);
  console.error(`Error: ${p.stderr}`);
}
