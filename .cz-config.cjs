module.exports = {
  types: [
    { value: '🎉 init', name: 'init:     🎉 初始化' },
    { value: '✨ feat', name: 'feat:     ✨ 新功能' },
    { value: '🐛 fix', name: 'fix:      🐛 修复bug' },
    { value: '📚 docs', name: 'docs:     📚 文档变更' },
    { value: '💎 style', name: 'style:    💎 代码格式（不影响代码运行的变动）' },
    { value: '🔨 refactor', name: 'refactor: 🔨 重构（既不是增加feature，也不是修复bug）' },
    { value: '⚡️ perf', name: 'perf:     ⚡️ 性能优化' },
    { value: '✅ test', name: 'test:     ✅ 增加测试' },
    { value: '🔧 chore', name: 'chore:    🔧 构建过程或辅助工具的变动' },
    { value: '⏪️ revert', name: 'revert:   ⏪️ 回退' },
    { value: '📦️ build', name: 'build:    📦️ 打包' },
    { value: '👷 ci', name: 'ci:       👷 CI相关变更' },
    { value: '🚧 WIP', name: 'WIP:      🚧 工作进行中' }
  ],

  // override the messages, defaults are as follows
  messages: {
    type: '请选择提交类型:',
    scope: '请输入修改范围 (可选):',
    customScope: '请输入修改范围:',
    subject: '请简要描述提交 (必填):',
    body: '请输入详细描述 (可选):',
    breaking: '列出任何BREAKING CHANGES (可选):',
    footer: '请输入要关闭的issue (可选):',
    confirmCommit: '确认使用以上信息提交？'
  },
  scopes: [
    ['components', '组件相关'],
    ['hooks', 'hook 相关'],
    ['utils', 'utils 相关'],
    ['styles', '样式相关'],
    ['deps', '项目依赖'],
    ['other', '其他修改']
  ].map(([value, description]) => ({
    name: `${value.padEnd(30)} (${description})`
  })),

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['body', 'breaking', 'footer'],

  // limit subject length
  subjectLimit: 100
  // breaklineChar: '|', // It is supported for fields body and footer.
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
}
