tslint-sakura-contrib
=====
A set of TSLint rules used on some projects.

Installation
-----

  npm install tslint-sakura-contrib

Usage
-----

./node_modules/.bin/tslint -c ./node_modules/tslint-sakura-contrib/tslint.json "your_source_files".

Supported Rules
-----

Rule Name   | Description | Since
:---------- | :------------ | -------------
`all-lower-case-file-name` | The name of file or directory must be all lower case without underscore. | 1.0.0
`function-name` | The function name should be camelCase, the trailing underscore is allowed. Public method, protected method and static method should be camelCase, private method should be camelCase with trailing underscore. | 1.0.4
