#!/bin/bash

GIT_REPO_URL=$(git config --get remote.origin.url)

cd dist
git init .
git remote add github $GIT_REPO_URL
git branch -D gh-pages
git checkout -b gh-pages
git add .
git commit -am "GH Page deploy"
git push github gh-pages --force
cd ..