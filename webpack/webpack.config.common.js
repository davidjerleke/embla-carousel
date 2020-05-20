const path = require('path')

const SRC_PATH = path.resolve(__dirname, '../src')
const LIB_PATH = path.resolve(__dirname, '../lib')
const DOCS_PATH = path.resolve(__dirname, '../docs')
const SCSS_PATH = path.resolve(DOCS_PATH, 'scss')
const JS_PATH = DOCS_PATH

const CONFIG = {
  entry: [path.resolve(SRC_PATH, 'index.ts')],
  output: {
    path: DOCS_PATH,
    filename: 'index.js',
    library: 'EmblaCarousel',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: `(typeof self !== 'undefined' ? self : this)`,
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        loaders: [
          { loader: 'babel-loader' },
          { loader: 'awesome-typescript-loader' },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  optimization: {
    minimize: false,
  },
  plugins: [],
}

module.exports = {
  CONFIG,
  DOCS_PATH,
  SRC_PATH,
  LIB_PATH,
  SCSS_PATH,
  JS_PATH,
}
