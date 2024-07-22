import { standard } from './src/index.js'

export default standard({
  astro: {
    config: 'all',
  },
  formatters: {
    markdown: true,
  },
}, {
  ignores: ['tests/input/**'],
})
