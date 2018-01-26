#!/usr/bin/env bash -l

gem install bundler
rm -rf _site
npm run build -- buildSite
cd ./_site
bundle install
jekyll serve
