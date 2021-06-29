#! /usr/bin/env bash

set -o errexit -o nounset

cd output

touch .
touch .nojekyll
cat > CNAME << EOF
www.babsballetschool.nl
EOF