import { standard } from './src/index.js'

export default standard({
  astro: true,
  formatters: {
    astro: false,
  },
}, {
  ignores: ['tests/input/**'],
})
