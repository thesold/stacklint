# Stacklint

Code-style and linting presets cli-tool to quickly scaffold project development.

[![npm](https://img.shields.io/npm/v/stacklint.svg?style=for-the-badge)](https://www.npmjs.com/package/stacklint)
[![npm](https://img.shields.io/npm/dm/stacklint.svg?style=for-the-badge)](https://github.com/thesold/stacklint)
[![npm](https://img.shields.io/npm/l/stacklint.svg?style=for-the-badge)](https://github.com/thesold/stacklint)

All stacks use `lintstaged` to run all linted stacks when code is commited to the git repository. We feel that this is a really nice approach to avoid un-linted code creeping into the codebase.

Because standard lint configuration files are used any related Code-editor plugins should pickup and follow the same ruleset, or when running individual linters directly.

When running `stacklint` all node and composer packages required to lint the selected stacks are added to your configuration files and individual config files for each stack are also included.

## Installation

Stacklint is intended to be installed globally so that it can easily be run and there is no need to include the dependency in your project specific package.json.

```sh
npm install -g stacklint
```

## Usage

```sh
stacklint [options] <stacks>
```

After installing your lint stacks you will need to run required installs.

```sh
npm install
```

```sh
composer install
```

## Examples

The following example will setup all required files and packages to lint `php` and `md` Markdown files when they are committed to git.

```sh
stacklint php md json
```

Installs packages and configs for:

1. Lintstaged
1. PHP Codesniffer
1. Markdownlint
1. Jsonlint

## Available stacks

You can quickly check which stacks are available by running `stacklint -l` or `stacklint --list`.

1. js (Javascript. Also required additional stack for style guide. E.g. `airbnb`)
    1. airbnb (Airbnb style guide)
1. json
1. laravel (Use instead of `php` if using laravel)
1. md (Markdown)
1. php (PSR-2)
1. scss
1. vue (Requires `js` stack)

## Contributing

We welcome any contributions, especially new lint stacks.

## Support

If you have any question or problems please open an issue (or submit a PR). Alternatively you can contact me, [m2de](https://www.twitter.com/m2de_io) on Twitter.
