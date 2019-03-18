const webpack = require('webpack')
const config = require('./webpack.config.common.js')
const path = require('path')

const CONTENT_PATH = path.resolve(__dirname, '../sandbox')

config.mode = 'development'
config.devtool = 'source-map'
config.devServer = {
  contentBase: CONTENT_PATH,
  watchContentBase: true,
  open: true,
}
config.plugins.push(new webpack.HotModuleReplacementPlugin())

module.exports = config
