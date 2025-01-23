/** @type {import('tailwindcss').Config} */
export default {
  // 覆盖 content 配置，只包含当前项目文件
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // 可以添加项目特定的主题扩展
  theme: {
    extend: {
      // 项目特定的主题配置
    }
  }
}
