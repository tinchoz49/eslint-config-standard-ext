# An `ext`ended standard eslint configuration

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard--ext-05ae89.svg)](https://github.com/tinchoz49/eslint-config-standard-ext)

Using `almost` same rules as the original `standard`.

Almost:

- `space-before-function-paren`: **NO** more space before function paren.
- `comma-dangle`: Require trailing commas.
- `quote-props`: Consistent as needed.

Thanks to [antfu/eslint-config][eslint-config] extended to support:

- Using [ESLint Stylistic](https://github.com/eslint-stylistic/eslint-stylistic)
- Designed to work with TypeScript, JSX, Vue, JSON, YAML, Toml, Markdown, etc. Out-of-box.
- Auto fix for formatting (aimed to be used standalone **without** Prettier)
- Opinionated, but [very customizable](#customization)
- [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), compose easily!
- Optional [React][eslint-config-react], [Svelte](eslint-config-svelte), [UnoCSS](eslint-config-unocss), [Astro](eslint-config-astro), [Solid](eslint-config-solid) support
- Optional [formatters](#eslint-config-formatters) support for formatting CSS, HTML, XML, Astro, etc.
- Respects `.gitignore` by default
- Supports ESLint v9 or v8.50.0+

## Install

```bash
$ npm install --save-dev eslint eslint-config-standard-ext
```

## Usage

create eslint.config.(m)js in your project root:

```js
// eslint.config.js
import { standard } from 'eslint-config-standard-ext'

export default standard()
```

## Improved support for Astro files

```ts
// eslint.config.js
import { standard } from 'eslint-config-standard-ext'

export default standard({
  astro: {
    config: 'all' | 'base' | 'recommended' | 'jsx-a11y-recommended' | 'jsx-a11y-strict' | undefined,
    overrides: {} | undefined
  } | true
})
```

## Customization

It uses same options as [antfu/eslint-config](https://github.com/antfu/eslint-config?tab=readme-ov-file#customization)

Additional options:

- **javascript.organizeImports**: `boolean=true` Add support for sorting imports/exports.

[eslint-config]: https://github.com/antfu/eslint-config
[eslint-config-react]: https://github.com/antfu/eslint-config#react
[eslint-config-svelte]: https://github.com/antfu/eslint-config#svelte
[eslint-config-unocss]: https://github.com/antfu/eslint-config#unocss
[eslint-config-astro]: https://github.com/antfu/eslint-config#astro
[eslint-config-solid]: https://github.com/antfu/eslint-config#solid
[eslint-config-formatters]: https://github.com/antfu/eslint-config#formatters
