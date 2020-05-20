const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')
const merge = require('webpack-merge')
const { CONFIG, LIB_PATH } = require('./webpack.config.common.js')

module.exports = merge(CONFIG, {
  mode: 'production',
  output: {
    path: LIB_PATH,
  },
  plugins: [
    new CleanWebpackPlugin(['lib'], {
      root: path.resolve(__dirname, '../'),
    }),
  ],
})
