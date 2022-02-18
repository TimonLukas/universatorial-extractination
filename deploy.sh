#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

yarn build-storybook -o dist/storybook

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:TimonLukas/dyson-sphere-incremental.git main:gh-pages

cd -
