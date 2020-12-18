var { clearConsole } = require('./config/index')

var plugins = [
  [
    'import',
    {
      libraryName: 'vue-drag-tree-org',
      style: (name, file) => {
        const libDirIndex = name.lastIndexOf('/')
        const libDir = name.substring(0, libDirIndex)
        const fileName = name.substring(libDirIndex + 1)
        return `${libDir}/theme/${fileName}.css`
      }
    }
  ]
]
clearConsole && plugins.push('transform-remove-console')
module.exports = {
  presets: ['@babel/preset-env'],

  plugins: plugins
}
