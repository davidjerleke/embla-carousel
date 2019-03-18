const CleanWebpackPlugin = require('clean-webpack-plugin')
const config = require('./webpack.config.common.js')
const path = require('path')

const OUT_PATH = path.resolve(__dirname, '../lib')

config.output.path = OUT_PATH
config.mode = 'production'
config.plugins.push(
  new CleanWebpackPlugin(['lib'], {
    root: path.resolve(__dirname, '../'),
  }),
)

module.exports = config
