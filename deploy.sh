#!/usr/bin/env sh

set -e

sudo npm run build

cd dist
sudo git init
sudo git add -A
sudo git commit -m "Deploy"

git push -f git@github.com:akmadian/tvendors.git master:gh-pages

cd -