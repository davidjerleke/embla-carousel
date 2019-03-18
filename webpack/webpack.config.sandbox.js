const config = require('./webpack.config.common.js')

config.mode = 'production'
config.optimization = { minimize: true }

module.exports = config
