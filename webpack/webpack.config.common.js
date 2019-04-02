const path = require('path')

const SRC_PATH = path.resolve(__dirname, '../src')
const OUT_PATH = path.resolve(__dirname, '../docs')

module.exports = {
  entry: [path.resolve(SRC_PATH, 'index.ts')],
  output: {
    path: OUT_PATH,
    filename: 'index.js',
    library: 'EmblaCarousel',
    libraryTarget: 'umd',
    umdNamedDefine: true,
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
