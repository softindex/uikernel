#!/usr/bin/env bash -l

cd _site\
  && docker run --rm -p4000:4000 --volume="$PWD:/srv/jekyll" uikernel-site
