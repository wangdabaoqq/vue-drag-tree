const utils = require('../build/utils')
module.exports = {
  resolve: ['.js', '.vue', '.json'],
  alias: {
    '@': utils.resolve('../src'),
    '@p': utils.resolve('../packages'),
    '@e': utils.resolve('../examples')
  }
}
