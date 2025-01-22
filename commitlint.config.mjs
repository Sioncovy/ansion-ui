// commitlint.config.js
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        '🎉 init',
        '✨ feat',
        '🐛 fix',
        '📚 docs',
        '💎 style',
        '🔨 refactor',
        '⚡️ perf',
        '✅ test',
        '🔧 chore',
        '⏪️ revert',
        '📦️ build',
        '👷 ci',
        '🚧 WIP'
      ]
    ],
    'scope-enum': [2, 'always', ['components', 'hooks', 'utils', 'styles', 'deps', 'other']],
    'type-case': [0],
    'type-empty': [0],
    'scope-case': [0],
    'scope-empty': [0],
    'subject-empty': [0],
    'subject-full-stop': [0],
    'subject-case': [0],
    'header-max-length': [2, 'always', 100]
  }
}
