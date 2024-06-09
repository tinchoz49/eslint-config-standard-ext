import { standard } from './src/index.js'

export default standard({
  astro: true,
  formatters: {
    astro: true,
  },
}, {
  ignores: ['tests/input/**'],
})
