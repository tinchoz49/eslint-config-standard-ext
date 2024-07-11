/* eslint perfectionist/sort-objects: "error" */

/** @typedef {import('@antfu/eslint-config').OptionsFormatters} OptionsFormatters */
/** @typedef {import('@antfu/eslint-config').StylisticOptions} StylisticOptions */
/** @typedef {import('@antfu/eslint-config').TypedFlatConfigItem} TypedFlatConfigItem */
/** @typedef {import('@antfu/eslint-config').ConfigNames} ConfigNames */
/**
 * @template T, E
 * @typedef {import('eslint-flat-config-utils').FlatConfigComposer} FlatConfigComposer
 */

import { formatters } from '@antfu/eslint-config'

/**
 * @param {FlatConfigComposer<TypedFlatConfigItem, ConfigNames>} config
 * @param {true | OptionsFormatters} options
 * @param {StylisticOptions} stylisticOptions
 * @returns {Promise<TypedFlatConfigItem[]>}
 */
export default async function fixFormatters(config, options, stylisticOptions) {
  const configs = await formatters(
    options,
    stylisticOptions
  )

  const astroDisables = configs.find(c => c.name === 'antfu/formatter/astro/disables')
  if (astroDisables) {
    astroDisables.rules = {
      'antfu/consistent-list-newline': 'off',
      'style/arrow-parens': 'off',
      'style/block-spacing': 'off',
      'style/comma-dangle': 'off',
      'style/indent': 'off',
      'style/jsx-closing-bracket-location': 'off',
      'style/jsx-first-prop-new-line': 'off',
      'style/jsx-indent-props': 'off',
      'style/jsx-max-props-per-line': 'off',
      'style/max-len': 'off',
      'style/multiline-ternary': 'off',
      'style/no-multi-spaces': 'off',
      'style/object-curly-newline': 'off',
      'style/object-curly-spacing': 'off',
      'style/operator-linebreak': 'off',
      'style/quotes': 'off',
      'style/semi': 'off',
      'style/space-before-blocks': 'off',
      'style/space-before-function-paren': 'off',
    }

    config.onResolved((configs) => {
      const hasAstroSetup = configs.find(c => c.name === 'antfu/astro/setup')
      if (hasAstroSetup) {
        const astroFormatter = configs.find(c => c.name === 'antfu/formatter/astro')
        delete astroFormatter.languageOptions
        const formatPrettier = astroFormatter.rules['format/prettier']
        astroFormatter.rules['format/prettier'] = ['error', {
          ...formatPrettier[1],
          quoteProps: formatPrettier[1].quoteProps || 'consistent',
        }]
      }

      return configs
    })
  }

  return configs
}
