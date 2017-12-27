#!/usr/bin/env bash -l

gem install bundler
cd ./_site
bundle install
jekyll serve