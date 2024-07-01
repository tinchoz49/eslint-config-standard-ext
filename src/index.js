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

import { antfu, resolveSubOptions } from '@antfu/eslint-config'
import { isPackageExists } from 'local-pkg'

import fixFormatters from './fix-formatters.js'
import javascriptStandardRules from './javascript-standard-rules.js'
import stylisticOverrides from './stylistic-overrides.js'
import typescriptStandardRules from './typescript-standard-rules.js'

/**
 * @param {OptionsConfig & { javascript?: OptionsIsInEditor & OptionsOverrides & { organizeImports?: boolean } }} options
 * @param {...Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | FlatConfig[]>} userConfigs
 * @returns {FlatConfigComposer<TypedFlatConfigItem, ConfigNames>}
 */
export function standard(options = {}, ...userConfigs) {
  const {
    componentExts = [],
    formatters: formattersOptions = false,
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
    componentExts: Array.from(exts.values()),
    formatters: false,
    stylistic: {
      indent,
      jsx,
      overrides: {
        ...stylisticOverrides({
          quotes,
        }),
        ...overrides,
      },
      quotes,
      semi,
    },
    typescript,
  }, ...userConfigs)

  javascriptStandardRules(config, options?.javascript?.organizeImports)

  if (typescript) {
    typescriptStandardRules(config, 'tsconfigPath' in resolveSubOptions(options, 'typescript'))
  }

  if (formattersOptions) {
    config.append(fixFormatters(
      config,
      formattersOptions,
      resolveSubOptions(options, 'stylistic')
    ))
  }

  if (options?.astro) {
    // fix astro from antfu/eslint-config errors
    config.override('antfu/astro/rules', (config) => {
      delete config.rules['style/indent']
      return config
    })
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

  return config
}
