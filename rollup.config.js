import svgr from '@svgr/rollup'
import url from '@rollup/plugin-url'
import {terser} from "rollup-plugin-terser";
import { babel } from "@rollup/plugin-babel";
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import alias from '@rollup/plugin-alias';
import path from 'path';
import glob from 'glob';
import del from 'rollup-plugin-delete';
import postcss from "rollup-plugin-postcss";

const projectRootDir = path.resolve(__dirname);

const getRollupConfig = (target = 'esm') => ({
  input: './src/index.ts',
  output:[
    {
      dir: target === 'esm' ? 'dist/esm' : 'dist/csj',
      format: target,
      preserveModulesRoot: 'src',
      preserveModules: true,
      sourcemap: true,
    },
  ],
  plugins: getPluginsArray(target)
})

const getPluginsArray = (target = 'esm') => {
  const plugins = [
    alias({
      entries: [
        { find: 'src', replacement: path.resolve(projectRootDir, 'src') },
      ]
    }),
    resolve(),
    url(),
    ...getCSSFilesPluginsArray(),
    external(),
    babel({
      babelHelpers: "runtime",
      exclude: /node_modules/,
      extensions: [".js", ".ts", ".tsx"],
    }),
    svgr(),
  ];

  if (target === 'esm') {
    plugins.push(typescript({
      tsconfig: './tsconfig.json',
      declarationDir: 'dist/esm'
    }));
  } else {
    plugins.push(typescript({
      tsconfig: './tsconfig.json',
      declarationDir: 'dist/csj'
    }));
    plugins.unshift(
      del({ targets: 'dist/*' })
    );
  }

  plugins.push(
    terser()
  );

  return plugins;
}


/**
 * Build array of plugins which will build separate css file for each scss file.
 * Workaround for issue:
 * https://github.com/egoist/rollup-plugin-postcss/issues/160
 */
const getCSSFilesPluginsArray = () => {
  const config = []
  const files = glob.sync(path.resolve(__dirname, '**/*.scss'))
  files.forEach((file) => {
    const filePath = path.relative(path.resolve(__dirname, 'src'), file);
    const filePathWithoutExtension = filePath.replace(".scss", '')
    config.push(
      postcss({
        include: file,
        extract: `${filePathWithoutExtension}.css`,
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

export default [
  getRollupConfig('commonjs'),
  getRollupConfig('esm')
];
