/* eslint perfectionist/sort-objects: "error" */

/** @typedef {import('@antfu/eslint-config').TypedFlatConfigItem} TypedFlatConfigItem */
/** @typedef {import('@antfu/eslint-config').ConfigNames} ConfigNames */
/**
 * @template T, E
 * @typedef {import('eslint-flat-config-utils').FlatConfigComposer} FlatConfigComposer
 */

/**
 * @returns {(config: TypedFlatConfigItem) => Promise<TypedFlatConfigItem>}
 */
function typescriptTypeAwareRules() {
  return async (config) => {
    return {
      ...config,
      rules: {
        'dot-notation': 'off',
        'no-implied-eval': 'off',
        'no-throw-literal': 'off',
        'ts/await-thenable': ['error'],
        'ts/consistent-type-exports': ['error', {
          fixMixedExportsWithInlineTypeSpecifier: true,
        }],
        'ts/dot-notation': ['error', { allowKeywords: true }],
        'ts/no-base-to-string': ['error'],
        'ts/no-confusing-void-expression': ['error', { ignoreArrowShorthand: false, ignoreVoidOperator: false }],
        'ts/no-floating-promises': ['error'],
        'ts/no-for-in-array': ['error'],
        'ts/no-implied-eval': ['error'],
        'ts/no-misused-promises': ['error'],
        'ts/no-unnecessary-boolean-literal-compare': ['error'],
        'ts/no-unnecessary-type-assertion': ['error'],
        'ts/no-unsafe-argument': ['error'],
        'ts/non-nullable-type-assertion-style': ['error'],
        'ts/only-throw-error': ['error', { allowThrowingAny: false, allowThrowingUnknown: false }],
        'ts/prefer-includes': ['error'],
        'ts/prefer-optional-chain': ['error'],
        'ts/prefer-promise-reject-errors': ['error'],
        'ts/prefer-readonly': ['error'],
        'ts/prefer-reduce-type-parameter': ['error'],
        'ts/prefer-return-this-type': ['error'],
        'ts/promise-function-async': ['error'],
        'ts/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
        'ts/restrict-plus-operands': ['error', { skipCompoundAssignments: false }],
        'ts/restrict-template-expressions': ['error', { allowNumber: true }],
        'ts/return-await': ['error', 'always'],
        'ts/unbound-method': ['error', { ignoreStatic: false }],
      },
    }
  }
}

/**
 * @param {FlatConfigComposer<TypedFlatConfigItem, ConfigNames>} config
 * @param {boolean} isTypeAware
 */
export default function typescriptStandardRules(config, isTypeAware) {
  if (isTypeAware) {
    config.override('antfu/typescript/rules-type-aware', typescriptTypeAwareRules())
  }

  config
    .override('antfu/typescript/disables/dts', {
      rules: {
        'ts/triple-slash-reference': 'off',
      },
    })
    .append({
      files: ['**/*.d.ts'],
      rules: {
        'ts/triple-slash-reference': 'off',
      },
    })
    .append({
      files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.jsx'],
      name: 'typescript/disables/javascript',
      rules: {
        'ts/explicit-member-accessibility': 'off',
        'ts/explicit-module-boundary-types': 'off',
        'ts/triple-slash-reference': 'off',
      },
    })
    .override('antfu/typescript/rules', async (config) => {
      return {
        ...config,
        rules: {
          'no-dupe-class-members': 'off',
          'no-loss-of-precision': 'off',
          'no-redeclare': 'off',
          'no-use-before-define': 'off',
          'no-useless-constructor': 'off',
          'ts/adjacent-overload-signatures': ['error'],
          'ts/array-type': ['error', { default: 'array-simple' }],
          'ts/ban-ts-comment': ['error', {
            'minimumDescriptionLength': 3,
            'ts-check': false,
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': true,
            'ts-nocheck': true,
          }],
          'ts/ban-tslint-comment': ['error'],
          'ts/class-literal-property-style': ['error', 'fields'],
          'ts/consistent-generic-constructors': ['error', 'constructor'],
          'ts/consistent-indexed-object-style': ['error', 'record'],
          'ts/consistent-type-assertions': [
            'error',
            {
              assertionStyle: 'as',
              objectLiteralTypeAssertions: 'never',
            },
          ],
          'ts/consistent-type-definitions': ['error', 'interface'],
          'ts/consistent-type-imports': ['error', {
            disallowTypeAnnotations: true,
            fixStyle: 'inline-type-imports',
            prefer: 'type-imports',
          }],
          'ts/method-signature-style': ['error'],
          'ts/naming-convention': ['error', {
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
            selector: 'variableLike',
            trailingUnderscore: 'allow',
          }],
          'ts/no-array-constructor': ['error'],
          'ts/no-dupe-class-members': 'error',
          'ts/no-dynamic-delete': ['error'],
          'ts/no-empty-interface': ['error', { allowSingleExtends: true }],
          'ts/no-explicit-any': 'off',
          'ts/no-extra-non-null-assertion': ['error'],
          'ts/no-extraneous-class': ['error', { allowWithDecorator: true }],
          'ts/no-import-type-side-effects': 'off',
          'ts/no-invalid-void-type': ['error'],
          'ts/no-loss-of-precision': ['error'],
          'ts/no-misused-new': ['error'],
          'ts/no-namespace': ['error'],
          'ts/no-non-null-asserted-optional-chain': ['error'],
          'ts/no-non-null-assertion': ['error'],
          'ts/no-redeclare': ['error', { builtinGlobals: false }],
          'ts/no-require-imports': 'off',
          'ts/no-this-alias': ['error', { allowDestructuring: true }],
          'ts/no-unnecessary-type-constraint': ['error'],
          'ts/no-unused-expressions': ['error', {
            allowShortCircuit: true,
            allowTaggedTemplates: true,
            allowTernary: true,
            enforceForJSX: false,
          }],
          'ts/no-unused-vars': 'off',
          'ts/no-use-before-define': ['error', {
            classes: false,
            enums: false,
            functions: false,
            typedefs: false,
            variables: false,
          }],
          'ts/no-useless-constructor': ['error'],
          'ts/no-var-requires': ['error'],
          'ts/prefer-function-type': ['error'],
          'ts/prefer-ts-expect-error': ['error'],
          'ts/triple-slash-reference': ['error', { lib: 'never', path: 'never', types: 'never' }],
          'ts/unified-signatures': 'off',
        },
      }
    })
}
