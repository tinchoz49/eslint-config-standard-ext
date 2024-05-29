/* eslint perfectionist/sort-objects: "error" */

/**
 * @typedef {boolean | (import('@antfu/eslint-config').OptionsOverrides & { a11y?: boolean }) | undefined} AstroOptions
 */

/** @typedef {import('@antfu/eslint-config').TypedFlatConfigItem} TypedFlatConfigItem */

/**
 * @param {AstroOptions} options
 * @returns {Promise<TypedFlatConfigItem[]>}
 */
export default async function astro (options = {}) {
  const { default: astroConfig } = await import('eslint-plugin-astro')
  if (typeof options === 'boolean') {
    options = {}
  }

  return [
    ...(options?.a11y ? astroConfig.configs['jsx-a11y-recommended'] : astroConfig.configs.recommended),
    {
      files: ['**/*.astro'],
      rules: {
        ...(options?.overrides || {}),
        'astro/no-set-html-directive': 'off',
        'astro/semi': 'off',
        'style/indent': 'off',
        'style/jsx-closing-tag-location': 'off',
        'style/jsx-indent': 'off',
        'style/jsx-one-expression-per-line': 'off',
        'style/no-multiple-empty-lines': 'off'
      }
    }
  ]
}
