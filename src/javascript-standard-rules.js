/* eslint perfectionist/sort-objects: "error" */

/** @typedef {import('@antfu/eslint-config').TypedFlatConfigItem} TypedFlatConfigItem */
/** @typedef {import('@antfu/eslint-config').ConfigNames} ConfigNames */
/**
 * @template T, E
 * @typedef {import('eslint-flat-config-utils').FlatConfigComposer} FlatConfigComposer
 */

/**
 * @param {FlatConfigComposer<TypedFlatConfigItem, ConfigNames>} config
 */
export default function javascriptStandardRules(config) {
  config
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
    .override('antfu/javascript/rules', async (config) => {
      return {
        ...config,
        rules: {
          'accessor-pairs': ['error', { enforceForClassMembers: true, setWithoutGet: true }],
          'array-callback-return': ['error', {
            allowImplicit: false,
            checkForEach: false,
          }],
          'camelcase': ['error', {
            allow: ['^UNSAFE_'],
            ignoreGlobals: true,
            properties: 'never',
          }],
          'constructor-super': 'error',
          'default-case-last': 'error',
          'dot-notation': ['error', { allowKeywords: true }],
          'eqeqeq': ['error', 'always', { null: 'ignore' }],
          'new-cap': ['error', { capIsNew: false, newIsCap: true, properties: true }],
          'no-array-constructor': 'error',
          'no-async-promise-executor': 'error',
          'no-caller': 'error',
          'no-case-declarations': 'error',
          'no-class-assign': 'error',
          'no-compare-neg-zero': 'error',
          'no-cond-assign': 'error',
          'no-const-assign': 'error',
          'no-constant-condition': ['error', { checkLoops: false }],
          'no-control-regex': 'error',
          'no-debugger': 'error',
          'no-delete-var': 'error',
          'no-dupe-args': 'error',
          'no-dupe-class-members': 'error',
          'no-dupe-keys': 'error',
          'no-duplicate-case': 'error',
          'no-empty': ['error', { allowEmptyCatch: true }],
          'no-empty-character-class': 'error',
          'no-empty-pattern': 'error',
          'no-eval': 'error',
          'no-ex-assign': 'error',
          'no-extend-native': 'error',
          'no-extra-bind': 'error',
          'no-extra-boolean-cast': 'error',
          'no-fallthrough': 'error',
          'no-func-assign': 'error',
          'no-global-assign': 'error',
          'no-implied-eval': 'error',
          'no-import-assign': 'error',
          'no-invalid-regexp': 'error',
          'no-irregular-whitespace': 'error',
          'no-iterator': 'error',
          'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
          'no-lone-blocks': 'error',
          'no-loss-of-precision': 'error',
          'no-misleading-character-class': 'error',
          'no-multi-str': 'error',
          'no-new': 'error',
          'no-new-func': 'error',
          'no-new-native-nonconstructor': 'error',
          'no-new-wrappers': 'error',
          'no-obj-calls': 'error',
          'no-object-constructor': 'error',
          'no-octal': 'error',
          'no-octal-escape': 'error',
          'no-proto': 'error',
          'no-prototype-builtins': 'error',
          'no-redeclare': ['error', { builtinGlobals: false }],
          'no-regex-spaces': 'error',
          'no-return-assign': ['error', 'except-parens'],
          'no-self-assign': ['error', { props: true }],
          'no-self-compare': 'error',
          'no-sequences': 'error',
          'no-shadow-restricted-names': 'error',
          'no-sparse-arrays': 'error',
          'no-template-curly-in-string': 'error',
          'no-this-before-super': 'error',
          'no-throw-literal': 'error',
          'no-undef': 'error',
          'no-undef-init': 'error',
          'no-unexpected-multiline': 'error',
          'no-unmodified-loop-condition': 'error',
          'no-unneeded-ternary': ['error', { defaultAssignment: false }],
          'no-unreachable': 'error',
          'no-unreachable-loop': 'error',
          'no-unsafe-finally': 'error',
          'no-unsafe-negation': 'error',
          'no-unused-expressions': ['error', {
            allowShortCircuit: true,
            allowTaggedTemplates: true,
            allowTernary: true,
          }],
          'no-unused-vars': ['error', {
            args: 'none',
            caughtErrors: 'none',
            ignoreRestSiblings: true,
            vars: 'all',
          }],
          'no-use-before-define': ['error', { classes: false, functions: false, variables: false }],
          'no-useless-backreference': 'error',
          'no-useless-call': 'error',
          'no-useless-catch': 'error',
          'no-useless-computed-key': 'error',
          'no-useless-constructor': 'error',
          'no-useless-escape': 'error',
          'no-useless-rename': 'error',
          'no-useless-return': 'error',
          'no-var': 'warn',
          'no-void': 'error',
          'no-with': 'error',
          'object-shorthand': ['warn', 'properties'],
          'one-var': ['error', { initialized: 'never' }],
          'prefer-const': ['error', { destructuring: 'all' }],
          'prefer-promise-reject-errors': 'error',
          'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
          'sort-imports': 'off',
          'symbol-description': 'error',
          'unicode-bom': ['error', 'never'],
          'use-isnan': ['error', {
            enforceForIndexOf: true,
            enforceForSwitchCase: true,
          }],
          'valid-typeof': ['error', { requireStringLiterals: true }],
          'yoda': ['error', 'never'],
        },
      }
    })
}
