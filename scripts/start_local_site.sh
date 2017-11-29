#!/usr/bin/env bash -l

rm -rf _site
gulp buildSite
cd _site
jekyll serve
