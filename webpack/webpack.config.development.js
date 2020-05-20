const webpack = require('webpack')
const merge = require('webpack-merge')
const {
  CONFIG,
  JS_PATH,
  SCSS_PATH,
} = require('./webpack.config.common.js')

module.exports = merge(CONFIG, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: [JS_PATH, SCSS_PATH],
    watchContentBase: true,
    open: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
})
