// const webpack = require('webpack')

const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

// env
const { NODE_ENV, VUE_APP_PORT, VUE_APP_MOCK } = process.env

// mock server
const mockServer = require('./mock/server')

module.exports = {
  publicPath: 'auto',
  outputDir: 'dist',
  productionSourceMap: false,
  devServer: {
    port: VUE_APP_PORT || 8000,
    hot: true,
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: {
      index: '/index.html',
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: false,
      },
    },
    onBeforeSetupMiddleware: function (devServer) {
      if (NODE_ENV === 'development' && VUE_APP_MOCK === 'true') {
        mockServer(devServer.app)
      }
    },
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {},
        },
        additionalData: `
          @import "~@/styles/css/var.less";
        `,
      },
    },
  },
  chainWebpack(config) {
    config.module.rule('svg').exclude.add(resolve('src/assets/svg')).end()
    config.module
      .rule('svg-sprite-loader')
      .test(/.svg$/)
      .include.add(resolve('src/assets/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'svg-[name]' })
  },
}
