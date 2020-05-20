const merge = require('webpack-merge')
const { CONFIG } = require('./webpack.config.common.js')

module.exports = merge(CONFIG, {
  mode: 'production',
  optimization: {
    minimize: true,
  },
})
