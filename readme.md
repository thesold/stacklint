# Stacklint

Code-style and linting presets cli-tool to quickly scaffold project development

## Installation

```sh
npm install stacklint
```

## Usage

```sh
stacklint [options] <stacks>
```

## Examples

The following example will setup all required files and packages to lint `php` and `md` Markdown files when they are committed to git. Because standard lint configuration files are used any related Code-editor plugins should pickup and follow the same ruleset.

```sh
stacklint php md
```

Installs:

1. PHP Codesniffer
1. Markdownlint
1. Lintstaged
