#!/usr/bin/env sh


# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy提交'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git pull --rebase https://github.com/wxfwill/myBlog.git master:gh-pages

git push -f https://github.com/wxfwill/will-notes.git master:gh-pages


cd -