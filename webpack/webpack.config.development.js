const webpack = require('webpack')
const config = require('./webpack.config.common.js')
const path = require('path')

const DOCS_PATH = path.resolve(__dirname, '../docs')
const ASSETS_PATH = path.resolve(DOCS_PATH, 'assets')

config.mode = 'development'
config.devtool = 'source-map'
config.devServer = {
  contentBase: [DOCS_PATH, ASSETS_PATH],
  watchContentBase: true,
  open: true,
}
config.plugins.push(new webpack.HotModuleReplacementPlugin())

module.exports = config
