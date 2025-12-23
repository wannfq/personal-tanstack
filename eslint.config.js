//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '.output/**',
      'public/assets/**',
      '.cache/**',
    ],
  },
  ...tanstackConfig,
]
