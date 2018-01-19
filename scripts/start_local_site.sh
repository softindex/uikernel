#!/usr/bin/env bash -l

rm -rf _site
npm run build -- buildSite
cd _site
jekyll serve
