import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'

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
      resolve({ extensions }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist/types',
        exclude: ['**/*.test.tsx', '**/*.test.ts']
      }),
      babel({
        extensions,
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
        exclude: 'node_modules/**'
      }),
      postcss({
        extract: false, // 不单独提取 CSS 文件
        modules: {
          generateScopedName: '[name]__[local]__[hash:base64:5]',
          localsConvention: 'camelCase'
        },
        use: ['sass'],
        inject: true, // 自动注入 CSS
        minimize: true
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
    external: [/\.scss$/]
  }
])

export default config
