#!/usr/bin/env bash

BIN_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$(dirname "$BIN_DIR")"

#./node_modules/.bin/tslint -c ""${ROOT_DIR}"/tests/alllowercasefilenamerule/tslint.json" "tests/alllowercasefilenamerule/*.ts"
./node_modules/.bin/tslint -c ""${ROOT_DIR}"/tslint.json" "tests/preferconstrule/*.ts"
