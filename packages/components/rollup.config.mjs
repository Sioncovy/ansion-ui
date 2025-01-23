import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import alias from '@rollup/plugin-alias'
import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'
import path from 'path'
import { fileURLToPath } from 'url'
import postcssImport from 'postcss-import'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const config = defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/index.mjs',
        format: 'esm',
        sourcemap: true
      }
    ],
    external: ['react', 'react-dom', 'classnames'],
    plugins: [
      // 路径别名配置
      alias({
        entries: [
          {
            find: '@',
            replacement: path.resolve(__dirname, 'src')
          }
        ]
      }),
      resolve({ extensions }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist/types',
        exclude: ['**/*.test.tsx', '**/*.test.ts']
      }),
      postcss({
        // extract: 'index.css', // 提取CSS到单独文件
        modules: {
          generateScopedName: '[name]__[local]__[hash:base64:5]',
          localsConvention: 'camelCase',
          exclude: /tokens\/css\/.*\.css$/
        },
        use: ['sass'],
        inject: true, // 自动注入 CSS
        minimize: true,
        extensions: ['.css', '.scss'], // 需要处理的文件扩展名
        // 添加 PostCSS 插件配置
        plugins: [
          postcssImport({
            // 可以配置导入路径
            path: [
              'src/styles/tokens/css',
              'src', // 添加 src 目录
              '.' // 添加根目录
            ]
          })
        ]
      }),
      babel({
        extensions,
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
        exclude: 'node_modules/**'
      }),

      terser()
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es'
    },
    plugins: [
      dts({
        compilerOptions: {
          baseUrl: 'src'
        }
      })
    ],
    // 修改 external 配置，排除所有 CSS/SCSS 文件
    external: [/\.(css|scss)$/]
  }
])

export default config
