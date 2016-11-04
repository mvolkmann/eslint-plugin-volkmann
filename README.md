# eslint-plugin-volkmann

for learning how to write plugins

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-volkmann`:

```
$ npm install eslint-plugin-volkmann --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-volkmann` globally.

## Usage

Add `volkmann` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "volkmann"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "volkmann/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here
