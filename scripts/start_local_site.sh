#!/usr/bin/env bash -l

rm -rf _site\
  && npm run build -- buildSite\
  && cd _site\
  && docker run --rm -p4000:4000 --volume="$PWD:/srv/jekyll" uikernel-site
