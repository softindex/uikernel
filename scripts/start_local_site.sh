#!/usr/bin/env bash -l

gulp buildSite
cd _site
jekyll serve
