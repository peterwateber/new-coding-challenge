#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
src=".."

value=`cat $DIR/module.txt`
echo "$value" > "$DIR/../node_modules/react-time-picker/index.d.ts"