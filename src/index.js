/* eslint perfectionist/sort-objects: "error" */

/**
 * @typedef {import('eslint').Linter.FlatConfig} FlatConfig
 */
/**
 * @typedef {import('eslint').Linter.RulesRecord} RulesRecord
 */
/**
 * @template {FlatConfig} T
 * @template {string} M
 * @typedef {import('eslint-flat-config-utils').FlatConfigComposer<T, M>} FlatConfigComposer
 */
/**
 * @typedef {import('@antfu/eslint-config').OptionsConfig} OptionsConfig
 */
/**
 * @typedef {import('@antfu/eslint-config').OptionsIsInEditor} OptionsIsInEditor
 */
/**
 * @typedef {import('@antfu/eslint-config').OptionsOverrides} OptionsOverrides
 */
/**
 * @template T
 * @typedef {import('@antfu/eslint-config').Awaitable<T>} Awaitable
 */
/**
 * @typedef {import('@antfu/eslint-config').TypedFlatConfigItem} TypedFlatConfigItem
 */
/**
 * @typedef {import('@antfu/eslint-config').ConfigNames} ConfigNames
 */
/**
 * @typedef {import('@antfu/eslint-config').OptionsFormatters} OptionsFormatters
 */
/**
 * @typedef {{
 *  astro?: OptionsOverrides & Pick<import('eslint-astro-mate').Options, 'config'>
 *  formatters?: boolean | Omit<OptionsFormatters, 'astro'>
 * }} ExtendOptions
 */
/**
 * @typedef {Omit<OptionsConfig, 'astro' | 'formatters'> & ExtendOptions} StandardExtOptions
 */

import { isPackageExists } from 'local-pkg'

import { antfu, ensurePackages, resolveSubOptions } from '@antfu/eslint-config'

import javascriptStandardRules from './javascript-standard-rules.js'
import stylisticOverrides from './stylistic-overrides.js'
import typescriptStandardRules from './typescript-standard-rules.js'

/**
 * @param {StandardExtOptions} options
 * @param {...Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | FlatConfig[]>} userConfigs
 * @returns {FlatConfigComposer<TypedFlatConfigItem, ConfigNames>}
 */
export function standard(options = {}, ...userConfigs) {
  const {
    componentExts = [],
    formatters = false,
    stylistic,
    typescript = isPackageExists('typescript'),
  } = options

  const { indent = 2, jsx = true, overrides = {}, quotes = 'single', semi = false } = typeof stylistic === 'object' ? stylistic : {}

  const exts = new Set(componentExts)

  if (options.astro) {
    exts.add('astro')
  }

  const config = antfu({
    ...options,
    astro: false,
    componentExts: Array.from(exts.values()),
    formatters: formatters
      ? (typeof formatters === 'object'
          ? { ...formatters, astro: false }
          : {
              astro: false,
              css: true,
              graphql: true,
              html: true,
              markdown: true,
              slidev: isPackageExists('@slidev/cli'),
              xml: isPackageExists('@prettier/plugin-xml'),
            })
      : formatters,
    stylistic: {
      indent,
      jsx,
      overrides: {
        ...stylisticOverrides({
          quotes: quotes === 'backtick' ? 'double' : quotes,
        }),
        ...overrides,
      },
      quotes: quotes === 'backtick' ? 'double' : quotes,
      semi,
    },
    typescript,
  }, ...userConfigs)

  javascriptStandardRules(config)

  if (typescript) {
    typescriptStandardRules(config, 'tsconfigPath' in resolveSubOptions(options, 'typescript'))
  }

  config.override('antfu/jsdoc/rules', (config) => {
    return {
      ...config,
      rules: {
        ...config.rules,
        'jsdoc/check-alignment': 'warn',
        'jsdoc/check-line-alignment': 'warn',
      },
    }
  })

  config.override('antfu/perfectionist/setup', (config) => {
    return {
      ...config,
      rules: {
        ...config.rules,
        'perfectionist/sort-imports': [
          'error',
          {
            customGroups: {
              type: {
                astro: ['^astro$', '^astro:.+'],
              },
              value: {
                astro: ['^astro:*', '^astro:.+'],
              },
            },
            groups: [
              'builtin-type',
              'builtin',
              'external-type',
              ['astro', 'external'],
              'internal-type',
              'internal',
              ['parent-type', 'sibling-type', 'index-type'],
              ['parent', 'sibling', 'index'],
              'object',
              'unknown',
            ],
            internalPattern: ['@/*', '~/*'],
            newlinesBetween: 'always',
            order: 'asc',
            type: 'natural',
          },
        ],
      },
    }
  })

  if (options?.astro) {
    const astroOptions = typeof options.astro === 'object' ? options.astro : {}
    config.append((async () => {
      await ensurePackages([
        'eslint-astro-mate',
        astroOptions?.config?.includes('a11y') && 'eslint-plugin-jsx-a11y',
      ].filter(Boolean))

      const { astro } = await import('eslint-astro-mate')
      return astro({
        config: astroOptions.config,
        overrides: {
          'ts/explicit-function-return-type': 'off',
          ...astroOptions.overrides,
        },
        style: {
          arrowParens: false,
          blockSpacing: true,
          commaDangle: 'always',
          indent,
          pluginName: 'style',
          quoteProps: 'consistent-as-needed',
          quotes: quotes === 'backtick' ? 'double' : quotes,
          semi,
        },
        tsPluginName: 'ts',
      })
    })())
  }

  return config
}
