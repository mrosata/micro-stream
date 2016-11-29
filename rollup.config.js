import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import istanbul from 'rollup-plugin-istanbul';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

export default {
  entry: 'lib/index.js',
  plugins: [
    istanbul({
      exclude: ['test/**/*', 'node_modules/**/*'],
      ignore: [ '**/spec/**', '**/fixture/**' ]
    }),
    babel(babelrc())
  ],
  external: external,
  targets: [
    {
      dest: pkg['main'],
      format: 'umd',
      moduleName: 'microStream',
      sourceMap: false
    },
    {
      dest: pkg['jsnext:main'],
      format: 'es',
      sourceMap: false
    },
    {
      dest: pkg['iife:main'],
      format: 'iife',
      moduleName: 'Stream',
      sourceMap: false
    }
  ]
};
