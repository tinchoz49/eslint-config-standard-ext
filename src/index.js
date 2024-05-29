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
/**
 * @typedef {import('./astro.js').AstroOptions} AstroOptions
 */

import { antfu, resolveSubOptions } from '@antfu/eslint-config'
import { isPackageExists } from 'local-pkg'

import astro from './astro.js'
import javascriptStandardRules from './javascript-standard-rules.js'
import typescriptStandardRules from './typescript-standard-rules.js'

/**
 * @param {OptionsConfig & { astro?: AstroOptions, javascript?: OptionsIsInEditor & OptionsOverrides & { organizeImports?: boolean } }} options
 * @param {...Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | FlatConfig[]>} userConfigs
 * @returns {FlatConfigComposer<TypedFlatConfigItem, ConfigNames>}
 */
export function standard (options = {}, ...userConfigs) {
  const {
    typescript = isPackageExists('typescript')
  } = options

  const config = antfu({
    ...options,
    astro: false,
    stylistic: {
      indent: 2,
      jsx: true,
      overrides: {
        ...(resolveSubOptions(options, 'stylistic').overrides || {}),
        'antfu/curly': 'off',
        'antfu/if-newline': 'off',
        'antfu/top-level-function': 'off',
        curly: ['error', 'multi-line'],
        'style/array-bracket-spacing': ['error', 'never'],
        'style/arrow-parens': ['error', 'as-needed'],
        'style/arrow-spacing': ['error', { after: true, before: true }],
        'style/block-spacing': ['error', 'always'],
        'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
        'style/comma-dangle': ['error', {
          arrays: 'never',
          exports: 'never',
          functions: 'never',
          imports: 'never',
          objects: 'never'
        }],
        'style/comma-spacing': ['error', { after: true, before: false }],
        'style/comma-style': ['error', 'last'],
        'style/computed-property-spacing': ['error', 'never', { enforceForClassMembers: true }],
        'style/dot-location': ['error', 'property'],
        'style/eol-last': 'error',
        'style/func-call-spacing': ['error', 'never'],
        'style/generator-star-spacing': ['error', { after: true, before: true }],
        'style/jsx-quotes': ['error', 'prefer-single'],
        'style/key-spacing': ['error', { afterColon: true, beforeColon: false }],
        'style/keyword-spacing': ['error', { after: true, before: true }],
        'style/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
        'style/multiline-ternary': ['error', 'always-multiline'],
        'style/new-parens': 'error',
        'style/no-extra-parens': ['error', 'functions'],
        'style/no-floating-decimal': 'error',
        'style/no-mixed-operators': ['error', {
          allowSamePrecedence: true,
          groups: [
            ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
            ['&&', '||'],
            ['in', 'instanceof']
          ]
        }],
        'style/no-mixed-spaces-and-tabs': 'error',
        'style/no-multi-spaces': 'error',
        'style/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
        'style/no-tabs': 'error',
        'style/no-trailing-spaces': 'error',
        'style/no-whitespace-before-property': 'error',
        'style/object-curly-newline': ['error', { consistent: true, multiline: true }],
        'style/object-curly-spacing': ['error', 'always'],
        'style/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
        'style/operator-linebreak': ['error', 'after', { overrides: { ':': 'before', '?': 'before', '|>': 'before' } }],
        'style/padded-blocks': ['error', { blocks: 'never', classes: 'never', switches: 'never' }],
        'style/quote-props': ['error', 'as-needed'],
        'style/rest-spread-spacing': ['error', 'never'],
        'style/semi-spacing': ['error', { after: true, before: false }],
        'style/space-before-blocks': ['error', 'always'],
        'style/space-before-function-paren': ['error', 'always'],
        'style/space-in-parens': ['error', 'never'],
        'style/space-infix-ops': 'error',
        'style/space-unary-ops': ['error', { nonwords: false, words: true }],
        'style/spaced-comment': ['error', 'always', {
          block: { balanced: true, exceptions: ['*'], markers: ['*package', '!', ',', ':', '::', 'flow-include'] },
          line: { markers: ['*package', '!', '/', ',', '='] }
        }],
        'style/template-curly-spacing': ['error', 'never'],
        'style/template-tag-spacing': ['error', 'never'],
        'style/wrap-iife': ['error', 'any', { functionPrototypeMethods: true }],
        'style/yield-star-spacing': ['error', 'both']
      },
      quotes: 'single',
      semi: false
    },
    typescript
  }, ...userConfigs)
    .override('antfu/javascript/rules', javascriptStandardRules(options?.javascript?.organizeImports))
    .override('antfu/jsdoc/rules', {
      rules: {
        'jsdoc/require-returns-check': 'off',
        'jsdoc/require-returns-description': 'off'
      }
    })
    .override('antfu/test/rules', {
      rules: {
        'test/no-only-tests': 'error'
      }
    })
    .override('antfu/unicorn/rules', {
      rules: {
        'unicorn/no-useless-spread': 'error'
      }
    })
    .override('antfu/yaml/rules', {
      rules: {
        'yaml/quotes': ['error', {
          avoidEscape: true,
          prefer: 'double'
        }]
      }
    })
    .override('antfu/imports/rules', {
      rules: {
        'import/export': ['error'],
        'import/extensions': ['error', 'ignorePackages'],
        'import/first': ['error'],
        'import/no-absolute-path': ['error', { amd: false, commonjs: true, esmodule: true }],
        'import/no-duplicates': ['error'],
        'import/no-named-default': ['error'],
        'import/no-webpack-loader-syntax': ['error'],
        'import/order': 'off'
      }
    })
    .override('antfu/node/rules', {
      rules: {
        'node/prefer-global/buffer': 'off',
        'node/prefer-global/process': 'off'
      }
    })

  if (typescript) {
    config.override('antfu/typescript/rules', typescriptStandardRules('tsConfigPath' in resolveSubOptions(options, 'typescript')))
    config.append({
      files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.jsx'],
      name: 'disable-explicit-ts-for-js',
      rules: {
        'ts/explicit-function-return-type': 'off',
        'ts/explicit-member-accessibility': 'off',
        'ts/explicit-module-boundary-types': 'off'
      }
    })
  }

  // better astro support
  if (options?.astro) {
    config.append(astro(options?.astro))
  }

  return config
}
