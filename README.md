# thunberg

Monorepo for vnphanquang.com

## Table of Contents

- [thunberg](#thunberg)
  - [Table of Contents](#table-of-contents)
  - [Nested Documentation](#nested-documentation)
  - [Prerequisites](#prerequisites)
  - [Devtools](#devtools)
    - [direnv](#direnv)
    - [Recommended Vscode Extensions](#recommended-vscode-extensions)
  - [Development](#development)
  - [Project Structure](#project-structure)
  - [Unpublished Local Projects](#unpublished-local-projects)

---

## Nested Documentation

Documentation for each project might be nested in subdirectory, below are some shortcuts

- [Postgres Idempotent patterns](./docs/postgres/idempotency.md)
- [Detailed Documentation for Blog](./apps/blog/README.md)

## Prerequisites

This monorepo is managed with [@microsoft/rush][rush]; familiarity with [rush] is essential.

See [rush.json] for current node, pnpm, and rush version requirement.

| Tool                | Installation                                     | What?                                             |
| ------------------- | ------------------------------------------------ | ------------------------------------------------- |
| [pnpm]              | `npm install -g pnpm`, or follow [website][pnpm] | alternative to `npm`, better support for monorepo |
| [rush]              | `npm install -g @microsoft/rush`                 | monorepo toolchain                                |
| [sort-package-json] | `npm install -g sort-package-json`               | sort package.json                                 |
| [npm-check-updates] | `npm install -g npm-check-updates`               | check for new version of npm packages             |

## Devtools

### direnv

[direnv] can be setup to automatically load env on directory change.

```bash
# if using direnv, make sure to use below syntax in .envrc files
export SOME_VAR=""
# otherwise if using normal .env
SOME_VAR=""
```

To auto switch nvm node version as specified in [rush.json], add to `.envrc`

```bash
if [ -z "$NVM_DIR" ]; then
  export NVM_DIR=~/.nvm
fi
type -a nvm 2> /dev/null || source $NVM_DIR/nvm.sh
nvm use $(node -e 'console.log(require("./rush.json").nodeSupportedVersionRange)')
```

### Recommended Vscode Extensions

Some extensions that are well suited for this project:

| Extension                                                                                                  | Author         |
| ---------------------------------------------------------------------------------------------------------- | -------------- |
| [Monorepo Workspace](https://marketplace.visualstudio.com/items?itemName=folke.vscode-monorepo-workspace)  | Folke Lemaitre |
| [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)             | Svelte         |
| [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) | Brad Cornes    |
| [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)                | stylelint      |


## Development

- Globally-defined commands (run with `rush <command>`) can be found in [command-line.json](./common/config/rush/command-line.json).

- Read `package.json` in each project for project-wised commands (run with `rushx <command>`).

- Install dependencies:

```bash
cd <path-to-project> && rush add -p <npm_package_name> --caret
```

Use flag `--dev` to add dev dependencies

## Project Structure

```dir
root
  |
  |-- common          : configs, hooks, and rush-managed assets
  |-- tools           : common toolings (ex: eslint) used across projects
  |-- libs            : shared logics (ex: ui library, tailwind plugins) for use in apps
       :
       |-- __template : template for creating library project
       :
  |-- apps            : standalone applications
       :
       |-- __template : template for creating application project
       :
```

<!-- GENERATED PROJECT SUMMARY START -->

## Unpublished Local Projects

<!-- the table below was generated using the ./tools/toolbox (readme) script -->

| Folder | Description |
| ------ | -----------|
| [/apps/__template](./apps/__template/) | Template for creating new app for monorepo setup |
| [/apps/blog/frontend](./apps/blog/frontend/) | frontend for vnphanquang blog |
| [/apps/blog/graphql](./apps/blog/graphql/) | GraphQL generated codes for @thunberg/blog |
| [/apps/blog/i18n](./apps/blog/i18n/) | i18n artifacts for @thunberg/blog |
| [/libs/__template](./libs/__template/) | Template for creating new library for monorepo setup |
| [/libs/common](./libs/common/) | Common goodies for use across projects |
| [/libs/tailwind](./libs/tailwind/) | General tailwind plugin for thunberg projects |
| [/tools/eslint-config](./tools/eslint-config/) | Eslint config base for use in all projects |
| [/tools/toolbox](./tools/toolbox/) | Used to execute various operations specific to this repo |

<!-- GENERATED PROJECT SUMMARY END -->

[rush]: https://rushjs.io/
[pnpm]: https://pnpm.io/
[sort-package-json]: https://www.npmjs.com/package/sort-package-json
[npm-check-updates]: https://www.npmjs.com/package/npm-check-**updates**
[direnv]: https://direnv.net/
[rush.json]: ./rush.json
