import assert from 'node:assert'
import fs from 'node:fs/promises'

import { ESLint } from 'eslint'
import test from 'node:test'

import { standard } from '../src/index.js'

test('basic: astro', async () => {
  const eslint = new ESLint({
    fix: true,
    overrideConfigFile: './tests/eslint.config.js',
    overrideConfig: await standard({
      astro: true,
    }),
  })

  const results = await eslint.lintFiles(['tests/input/index.astro'])
  assert.strictEqual(results[0].output, await fs.readFile('./tests/output/basic.astro', 'utf-8'))
})
