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
 *  @typedef {import('@antfu/eslint-config').OptionsIsInEditor} OptionsIsInEditor
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
import typescriptStandardRules, { typescriptTypeAwareRules } from './typescript-standard-rules.js'

/**
 * @param {OptionsConfig & { javascript?: OptionsIsInEditor & OptionsOverrides & { organizeImports?: boolean } }} options
 * @param {...Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | FlatConfig[]>} userConfigs
 * @returns {FlatConfigComposer<TypedFlatConfigItem, ConfigNames>}
 */
export function standard(options = {}, ...userConfigs) {
  const {
    formatters: formattersOptions = false,
    stylistic,
    typescript = isPackageExists('typescript'),
  } = options

  const { indent = 2, jsx = true, overrides = {}, quotes = 'single', semi = false } = typeof stylistic === 'object' ? stylistic : {}

  const config = antfu({
    ...options,
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
    .override('antfu/javascript/rules', javascriptStandardRules(options?.javascript?.organizeImports))
    .override('antfu/jsdoc/rules', {
      rules: {
        'jsdoc/require-returns-check': 'off',
        'jsdoc/require-returns-description': 'off',
      },
    })
    .override('antfu/test/rules', {
      rules: {
        'test/no-import-node-test': 'off',
        'test/no-only-tests': 'error',
      },
    })
    .override('antfu/imports/rules', {
      rules: {
        'import/export': ['error'],
        'import/extensions': 'off',
        'import/first': ['error'],
        'import/no-absolute-path': ['error', { amd: false, commonjs: true, esmodule: true }],
        'import/no-duplicates': ['error'],
        'import/no-named-default': ['error'],
        'import/no-webpack-loader-syntax': ['error'],
        'import/order': 'off',
      },
    })
    .override('antfu/node/rules', {
      rules: {
        'node/prefer-global/buffer': 'off',
        'node/prefer-global/process': 'off',
      },
    })

  if (typescript) {
    config.override('antfu/typescript/rules', typescriptStandardRules())

    if ('tsconfigPath' in resolveSubOptions(options, 'typescript')) {
      config.override('antfu/typescript/rules-type-aware', typescriptTypeAwareRules())
    }

    config
      .override('antfu/typescript/disables/dts', {
        rules: {
          'ts/triple-slash-reference': 'off',
        },
      })
      .append({
        files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.jsx'],
        name: 'typescript/disables/javascript',
        rules: {
          'ts/explicit-function-return-type': 'off',
          'ts/explicit-member-accessibility': 'off',
          'ts/explicit-module-boundary-types': 'off',
          'ts/triple-slash-reference': 'off',
        },
      })
  }

  if (formattersOptions) {
    config.append(fixFormatters(
      config,
      formattersOptions,
      resolveSubOptions(options, 'stylistic')
    ))
  }

  return config
}
