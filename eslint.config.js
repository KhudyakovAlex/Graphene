import js from '@eslint/js'
import { vueTsConfigs, withVueTs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'

export default withVueTs(
  {
    ignores: [
      '.pixso-temp/**',
      'coverage/**',
      'dist/**',
      'examples/dist/**',
      'node_modules/**',
    ],
  },
  js.configs.recommended,
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  {
    rules: {
      'vue/multi-word-component-names': ['error', { ignores: ['Panel', 'Surface'] }],
    },
  },
)
