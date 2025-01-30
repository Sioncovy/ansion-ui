import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import alias from '@rollup/plugin-alias'
import replace from '@rollup/plugin-replace'
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
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
        exports: 'auto'
      },
      {
        file: 'dist/index.mjs',
        format: 'esm',
        sourcemap: true
      }
    ],
    external: ['react', 'react-dom', 'classnames'],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        preventAssignment: true // 防止意外替换变量赋值
      }),
      alias({
        entries: [
          {
            find: '@',
            replacement: path.resolve(__dirname, 'src')
          }
        ]
      }),
      resolve({
        extensions,
        preferBuiltins: true // 优先使用Node.js内置模块
      }),
      commonjs({
        include: /node_modules/ // 仅处理node_modules中的CommonJS模块
      }),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false, // 由dts插件单独处理
        exclude: ['**/*.test.tsx', '**/*.test.ts', '**/*.stories.tsx', '**/__tests__/**']
      }),
      postcss({
        extract: 'styles/index.css', // 提取CSS到单独目录
        modules: {
          generateScopedName: '[hash:base64:8]', // 更短的hash命名
          localsConvention: 'camelCaseOnly', // 仅驼峰格式
          exclude: /tokens\/css\/.*\.css$/
        },
        use: {
          sass: {
            includePaths: [path.resolve(__dirname, 'src/styles')]
          }
        },
        minimize: true,
        extensions: ['.css', '.scss'],
        plugins: [
          postcssImport({
            path: ['src/styles/tokens/css', 'src', '.'],
            resolve: (id, basedir) => {
              // 增强路径解析
              if (id.startsWith('@/')) {
                return path.resolve(__dirname, 'src', id.slice(2))
              }
              return path.resolve(basedir, id)
            }
          })
        ]
      }),
      babel({
        extensions,
        babelHelpers: 'runtime', // 改为runtime模式
        presets: [
          [
            '@babel/preset-env',
            {
              targets: '> 0.5%, last 2 versions, not dead', // 明确目标浏览器
              modules: false,
              bugfixes: true
            }
          ],
          [
            '@babel/preset-react',
            {
              runtime: 'automatic',
              importSource: 'react' // 明确导入源
            }
          ]
        ],
        plugins: [
          '@babel/plugin-transform-runtime' // 添加runtime插件
          // 'babel-plugin-optimize-clsx' // 优化CSS类名组合
        ],
        exclude: 'node_modules/**'
      }),
      terser({
        format: {
          comments: false // 移除所有注释
        },
        compress: {
          pure_funcs: ['console.debug'], // 仅保留需要的console方法
          drop_console: true // 移除所有console
        }
      })
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
          baseUrl: 'src',
          paths: {
            // 同步路径别名
            '@/*': ['./src/*']
          }
        }
      })
    ],
    external: [/\.(css|scss)$/, /\.s?css$/] // 扩展排除规则
  }
])

export default config
