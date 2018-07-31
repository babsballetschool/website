#! /usr/bin/env bash

set -o errexit -o nounset

if [ -f ~/.bash_tokens ]; then
    source ~/.bash_tokens
fi

if [ -d output/.git ]; then
    echo "removing git directory"
    rm -rf output/.git
fi

rev=$(git rev-parse --short HEAD)

cd output

git init
git config user.name "Daan van Berkel"
git config user.email "daan@fifth-postulate.nl"

git remote add upstream "https://$GH_TOKEN@github.com/babsballetschool/babsballetschool.github.io.git"
git fetch upstream
git reset upstream/master

touch .
touch .nojekyll
cat > CNAME << EOF
www.babsballetschool.nl
EOF

git add -A .
git commit -m "rebuild pages at ${rev}"
git push -q upstream HEAD:master
