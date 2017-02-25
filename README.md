# eslint-plugin-volkmann

Mark Volkmann's collection of ESLint plugins

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
        "volkmann/rule-name": "error"
    }
}
```

## Supported Rules

* embrace-booleans
* exponentiation-operator
* ternary-operator

## Debugging tips

When testing a new rule that has not been deployed to npm yet,
add configuration of the rule to `.eslintrc.json`
in the project root directory like this:
````
"exponentiation-operator": ["error"],
````
and run this from the project root directory:
````
eslint --no-ignore --rulesdir lib/rules sample-code/file-to-test.js
````
The `--no-ignore` option is necessary because the `.eslintignore` file
ignores all files in the `sample-code` directory.
