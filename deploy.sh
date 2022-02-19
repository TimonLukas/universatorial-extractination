#!/usr/bin/env sh

# abort on errors
set -e

git update-index -q --ignore-submodules --refresh

version=$(jq -r .version package.json)
hash=$(git rev-parse --short HEAD)
editEmoji=""

if ! git diff-files --quiet --ignore-submodules --
then
    editEmoji=" ✏️"
fi

# build
yarn build

yarn build-storybook -o dist/storybook --preview-url=/universatorial-extractination/storybook/iframe.html

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m "Deployment $version ($hash$editEmoji)"

git push -f git@github.com:TimonLukas/universatorial-extractination.git master:gh-pages

cd ..

rm -rf dist
