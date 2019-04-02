const webpack = require('webpack')
const config = require('./webpack.config.common.js')
const path = require('path')

const JS_PATH = path.resolve(__dirname, '../docs')
const SCSS_PATH = path.resolve(__dirname, '../docs/scss')

config.mode = 'development'
config.devtool = 'source-map'
config.devServer = {
  contentBase: [JS_PATH, SCSS_PATH],
  watchContentBase: true,
  open: true,
}
config.plugins.push(new webpack.HotModuleReplacementPlugin())

module.exports = config
