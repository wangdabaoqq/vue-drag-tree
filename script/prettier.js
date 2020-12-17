/**
 * copy to https://github.com/facebook/react/blob/master/scripts/prettier/index.js
 * prettier api doc https://prettier.io/docs/en/api.html
 *----------*****--------------
 *  prettier all js and all ts.
 *----------*****--------------
 */

const glob = require('glob')
const prettier = require('prettier')
const fs = require('fs')

const prettierConfigPath = require.resolve('../prettier.config.js')

let didError = false

let files = []

const ignoreFiles = [
  '**/node_modules/**',
  'build/**',
  'es/**',
  'lib/**',
  'dist/**',
  '**/**.snap',
  '**/**.map',
  '**/components/style/color/**',
  '**/dist/**',
  '_site/**'
]

const prettierPaths = [
  'src/**/*.ts*',
  'src/**/*.js*',
  'src/**/*.jsx*',
  'src/**/*.less',
  'src/**/*.scss',
  'src/**/*.vue',
  'packages/**/*.ts*',
  'packages/**/*.js*',
  'packages/**/*.jsx*',
  'packages/**/*.less',
  'packages/**/*.scss',
  'packages/**/*.vue',
  'examples/**/*.ts*',
  'examples/**/*.js*',
  'examples/**/*.jsx*',
  'examples/**/*.less',
  'examples/**/*.scss',
  'examples/**/*.vue'
]
prettierPaths.forEach((path) => {
  const file = glob.sync(path, {
    ignore: ignoreFiles
  })
  files = files.concat(file)
})

// // get all ts files
// const tsFiles = glob.sync('src/**/*.ts*', {
//   ignore: ignoreFiles
// })
// files = files.concat(tsFiles)

// // get all js files
// const jsFiles = glob.sync('src/**/*.js*', {
//   ignore: ignoreFiles
// })
// files = files.concat(jsFiles)

// // get all less files
// const lessFiles = glob.sync('src/**/*.less', {
//   ignore: ignoreFiles
// })
// files = files.concat(lessFiles)

// const vueFiles = glob.sync('src/**/*.vue', {
//   ignore: ignoreFiles
// })
// files = files.concat(vueFiles)

if (!files.length) {
  return
}

files.forEach((file) => {
  const options = prettier.resolveConfig.sync(file, {
    config: prettierConfigPath
  })
  const fileInfo = prettier.getFileInfo.sync(file)
  if (fileInfo.ignored) {
    return
  }
  try {
    const input = fs.readFileSync(file, 'utf8')
    const withParserOptions = {
      ...options,
      parser: fileInfo.inferredParser
    }
    const output = prettier.format(input, withParserOptions)
    if (output !== input) {
      fs.writeFileSync(file, output, 'utf8')
      // eslint-disable-next-line no-console
      console.log(`\x1b[34m ${file} is prettier`)
    }
  } catch (e) {
    didError = true
  }
})

if (didError) {
  process.exit(1)
}
// eslint-disable-next-line no-console
console.log('\x1b[32m prettier success!')
