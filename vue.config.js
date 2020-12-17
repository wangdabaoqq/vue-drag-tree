const utils = require('./build/utils.js')
const { join } = require('path')
const aliasConfig = require('./config/alias')
const { externalMap } = require('./config/index')

const setAlias = (config) => {
  const { alias } = aliasConfig
  Object.keys(alias).forEach((key) => {
    config.resolve.alias.set(key, alias[key])
  })
}
module.exports = {
  lintOnSave: utils.isProduct,
  runtimeCompiler: true,
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  css: {
    extract: true,
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: (config) => {
    config.module
      .rule('js')
      .include.add(join(process.cwd(), 'src'))
      .end()
    // 设置别名
    setAlias(config)
    // 关闭利用空余带宽加载文件 提升首页速度
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // 配置别名
    config.extensions = aliasConfig.resolve
    config.module
      .rule('js')
      .include.add(/packages/)
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap((options) => {
        return options
      })
    config.when(utils.isProduct, (config) => {
      // 开启图片压缩
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          bypassOnDebug: true
        })
        .end()
    })
  },
  configureWebpack: (config) => {
    if (utils.isProduct) {
      config.externals = externalMap
    }
  },
  devServer: {
    // 端口号
    port: 8099,
    // eslint报错页面会被遮住
    overlay: {
      warnings: true,
      errors: true
    }
  },
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {}
  }
}
