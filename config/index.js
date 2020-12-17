const devConfig = require('./dev')
const prodConfig = require('./prod')
const isProduct = ['production', 'prod'].includes(process.env.NODE_ENV)
const config = isProduct ? prodConfig : devConfig
module.exports = {
  styleOutputPath: 'theme',
  outputPath: 'lib',
  clearConsole: config.clearConsole,
  // 打包忽略
  externalMap: {
    vue: 'Vue'
  }
}
