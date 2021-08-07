#!/usr/bin/env sh

set -e
pnpm build:demo

cd dist-demo

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:biowaffeln/zustand-middleware-xstate.git master:gh-pages

cd -