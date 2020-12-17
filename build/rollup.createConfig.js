const rollup = require('rollup')
const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const image = require('rollup-plugin-img')
const vue = require('rollup-plugin-vue')
const commonjs = require('rollup-plugin-commonjs')
const { terser } = require('rollup-plugin-terser')
const replace = require('rollup-plugin-replace')
const json = require('rollup-plugin-json')
const postcss = require('rollup-plugin-postcss')
const alias = require('rollup-plugin-alias')
const filesize = require('rollup-plugin-filesize')
const cssnano = require('cssnano')
const simplevars = require('postcss-simple-vars')
const nested = require('postcss-nested')
const cssnext = require('postcss-cssnext')
const fs = require('fs')

const { getAssetsPath, env, fsExistsSync, chalkConsole } = require('./utils')
const { esDir } = require('../config/rollup.build.config')
const aliasConfig = require('../config/alias')
const { styleOutputPath, externalMap } = require('../config/index')
const banner = require('../config/banner')
const isEs = (fmt) => fmt === esDir

function createPlugins({ min } = {}) {
  const exclude = 'node_modules/**'
  const plugins = [
    commonjs(),
    vue({
      css: false
    }),
    json(),
    filesize(),
    resolve({
      extensions: aliasConfig.resolve
    }),
    babel({
      runtimeHelpers: true,
      // 只编译我们的源代码
      exclude
    }),
    image({
      hash: false,
      output: getAssetsPath('/img'), // default the root
      extensions: /\.(png|jpg|jpeg|gif|svg)$/,
      limit: 8192, // default 8192(8k)
      exclude
    }),
    postcss({
      plugins: [simplevars(), nested(), cssnext({ warnForDuplicates: false }), cssnano()],
      use: [
        [
          'less',
          {
            javascriptEnabled: true
          }
        ]
      ],
      inject: false,
      // sourceMap: true,
      extensions: ['.css', '.less'],
      extract: true // 输出路径
    }),
    replace({
      exclude,
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    alias({
      ...aliasConfig.alias,
      resolve: aliasConfig.resolve
    })
  ]
  if (min) {
    plugins.push(terser())
  }
  return plugins
}

/**
 * 打包
 * @param {*} config
 */
function build(builds) {
  let buildCount = 0

  const total = builds.length
  const next = async () => {
    chalkConsole.building(buildCount + 1, total)
    await buildEntry(builds[buildCount])
    buildCount++
    buildCount < total ? next() : chalkConsole.success()
  }
  next()
}
/**
 * 打包入口
 * @param {*} config
 */
async function buildEntry(config) {
  const { output, suffix, input, format, moduleName } = config

  const inputOptions = {
    input,
    external: Object.keys(externalMap),
    plugins: createPlugins(config)
  }
  const fullName = output + suffix
  const file = getAssetsPath(fullName)
  const outOptions = {
    // dir: getAssetsPath(),
    file,
    format,
    name: moduleName,
    // exports: 'named',
    globals: externalMap
    // entryFileNames: file
  }
  const bundle = await rollup.rollup(inputOptions)
  let { output: outputData } = await bundle.generate(outOptions)

  await write({ output: outputData, fileName: output, format, fullName, file })
}
/**
 * 输入js文件
 * @param {*} param0
 */
async function write({ output, file, fileName, format, fullName } = {}) {
  for (const { isAsset, code, source } of output) {
    if (isAsset) {
      const cssFileName = `${fileName}.css`
      const filePath = isEs(format)
        ? getAssetsPath(`/${es}/${cssFileName}`)
        : getAssetsPath(`/${styleOutputPath}/${cssFileName}`)

      !fsExistsSync(filePath) && fs.writeFileSync(filePath, banner + source.toString())
    } else {
      const filePath = isEs(format) ? getAssetsPath(`/${es}/${fullName}`) : file
      let codeSource = code.replace(/\s?const\s/g, ' var ')
      fs.writeFileSync(filePath, banner + codeSource)
    }
  }
}
module.exports = {
  build
}
