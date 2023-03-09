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
      $`cd examples/${dirName} \
        && mv -v build/* ../../_site/examples/${dirName} \
        && rm -rf build`,
    ]);
  }
} catch (p) {
  console.error(`Exit code: ${p.exitCode}`);
  console.error(`Error: ${p.stderr}`);
}
