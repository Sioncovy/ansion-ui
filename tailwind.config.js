/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // 匹配所有包中的相关文件
    './packages/*/src/**/.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
