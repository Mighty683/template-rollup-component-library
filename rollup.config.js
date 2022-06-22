import svgr from '@svgr/rollup'
import url from '@rollup/plugin-url'
import {terser} from "rollup-plugin-terser";
import { babel } from "@rollup/plugin-babel";
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import alias from '@rollup/plugin-alias';
import path from 'path';
import glob from 'glob';
import del from 'rollup-plugin-delete';
import postcss from "rollup-plugin-postcss";

const packageJson = require("./package.json");
const projectRootDir = path.resolve(__dirname);


/**
 * Build array of plugins which will build separate css file for each scss file.
 * Workaround for issue:
 * https://github.com/egoist/rollup-plugin-postcss/issues/160
 */
const buildCSSFilesPlugins = () => {
  const config = []
  const files = glob.sync(path.resolve(__dirname, '**/*.scss'))
  files.forEach((file) => {
    const filePath = path.relative(path.resolve(__dirname, 'src'), file);
    const filePathWithoutExtension = filePath.replace(".scss", '')
    config.push(
      postcss({
        include: file,
        extract: path.resolve(`dist/${filePathWithoutExtension}.css`),
        minimize: true,
        plugins: [
          require('postcss-discard-duplicates'),
          require('postcss-minify')
        ],
        extensions: ['.css', '.scss']
      })
    )
  })
  return config;
}

export default [{
  input: './src/index.ts',
  output:[
    {
      dir: packageJson.module,
      format: "esm",
      preserveModulesRoot: 'src',
      preserveModules: true,
      sourcemap: true,
    },
  ],
  plugins: [
    del({ targets: 'dist/*' }),
    external(),
    alias({
      entries: [
        { find: 'src', replacement: path.resolve(projectRootDir, 'src') },
      ]
    }),
    resolve(),
    ...buildCSSFilesPlugins(),
    url(),
    svgr({icon: true}),
    babel({
      babelHelpers: "runtime",
      exclude: /node_modules/,
      extensions: [".js", ".ts", ".tsx"],
    }),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    terser(),
  ]
}];
