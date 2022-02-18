#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

yarn build-storybook -o dist/storybook --preview-url=/universatorial-extractination/storybook/iframe.html

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:TimonLukas/universatorial-extractination.git master:gh-pages

cd ..

rm -rf dist
