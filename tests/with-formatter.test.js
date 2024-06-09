import assert from 'node:assert'
import fs from 'node:fs/promises'
import test from 'node:test'

import { ESLint } from 'eslint'

import { standard } from '../src/index.js'

test('with-formatter: astro', async () => {
  const eslint = new ESLint({
    fix: true,
    overrideConfigFile: './tests/eslint.config.js',
    overrideConfig: await standard({
      astro: true,
      formatters: {
        astro: true,
      },
    }),
  })

  const results = await eslint.lintFiles(['tests/input/index.astro'])
  assert.strictEqual(results[0].output, await fs.readFile('./tests/output/with-formatter.astro', 'utf-8'))
})
