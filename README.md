# An `ext`ended standard eslint config

Using same rules as the original `standard`.

Thanks to [antfu/eslint-config](https://github.com/antfu/eslint-config) extended to support:

- Auto fix for formatting (aimed to be used standalone **without** Prettier)
- Designed to work with TypeScript, JSX, Vue, JSON, YAML, Toml, Markdown, etc. Out-of-box.
- Opinionated, but [very customizable](#customization)
- [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), compose easily!
- Optional [React](#react), [Svelte](#svelte), [UnoCSS](#unocss), [Astro](#astro), [Solid](#solid) support
- Optional [formatters](#formatters) support for formatting CSS, HTML, XML, etc.
- **Style principle**: Minimal for reading, stable for diff, consistent
  - Sorted imports, trailing commas not allowed
  - Single quotes, no semi
  - Using [ESLint Stylistic](https://github.com/eslint-stylistic/eslint-stylistic)
- Respects `.gitignore` by default
- Supports ESLint v9 or v8.50.0+

## Install

```bash
$ npm install --save-dev eslint @antfu/eslint-config
```

## Usage

create eslint.config.(m)js in your project root:

```js
// eslint.config.js
import { standard } from 'eslint-config-standard-ext'

export default standard()
```

## Customization

It uses same options as [antfu/eslint-config](https://github.com/antfu/eslint-config?tab=readme-ov-file#customization)

Additional options:
  - **javascript.organizeImports**: `boolean=true` Add support for sorting imports/exports.
  - **astro.a11y**: `boolean=false` Include a11y rules for astro files. Required: `eslint-plugin-jsx-a11y`.
