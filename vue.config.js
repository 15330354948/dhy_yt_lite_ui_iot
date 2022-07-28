/**
 * 配置该文件可以参考:
 * https://cli.vuejs.org/zh/config/#%E7%9B%AE%E6%A0%87%E6%B5%8F%E8%A7%88%E5%99%A8
 *
 */
// const url = 'http://luohu-gateway:9999'
// const url = 'http://47.105.80.201:10131/luohu_api'
// 基础路径，发布前修改这里,当前配置打包出来的资源都是相对路径
const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const pgEarthBuild = './node_modules/pgearth/Build'
const pgEarthSource = './node_modules/pgearth/Source'
const pgEarthExtends = './node_modules/pgearth/PGEarthExtends'
const pgEarthWorkers = '../Build/Workers'
const staticOutputDir = 'static'
const staticLibrasDir = staticOutputDir + '/pgearth/'
const TerserPlugin = require('terser-webpack-plugin')

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const vars = path.resolve(__dirname,'./src/assets/css/variable.less')

let publicPath = process.env.VUE_APP_CONTEXT_PATH || '/pt/'
module.exports = {
  publicPath: publicPath,
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: config => {
    // 忽略的打包文件
    config.externals({
      'axios': 'axios',
    })
    const entry = config.entry('app')
    entry
      .add('babel-polyfill')
      .end()
    entry
      .add('classlist-polyfill')
      .end()
    // config.module
    //   .rule('wasm')
    //   .test(/\.wasm$/)
    //   .use('wasm-loader')
    //   .loader('wasm-loader')
    //   .end()
    // config.module
    //   .rule('image')
    //   .test(/\.(png|jpe?g|gif)(\?.*)?$/)
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .end()
  },
  css: {
    extract: { ignoreOrder: true },
    loaderOptions: {
      less: {
        globalVars: {
            hack: `true; @import "${vars}"`,
        }
      }
    },
  },
  configureWebpack: {
    optimization: {
      minimizer: [
        new TerserPlugin({
          test:/\.m?js(\?.*)?$/i,//用来匹配需要压缩的文件。
          parallel: true,//启用/禁用多进程并发运行功能。
          terserOptions: {
            format: {
              comments: false,
            },
            mangle: true, // 混淆
            compress: {
              // drop_console: false, // 传true就是干掉所有的console.*这些函数的调用.
              // drop_debugger: false, // 干掉那些debugger;
              // pure_funcs: ['console.log'] // 如果你要干掉特定的函数比如console.info ，又想删掉后保留其参数中的副作用，那用pure_funcs来处理
            }
          },
          extractComments: false,//启用/禁用剥离注释功能
        })
      ]
    },
    output: {
      sourcePrefix: ' '
    },
    amd: {
      toUrlUndefined: true
    },
    resolve: {
      alias: {
        pgEarthExtends: path.resolve(__dirname, pgEarthExtends),
        pgEarthSource: path.resolve(__dirname, pgEarthSource),
        pgEarthBuild: path.resolve(__dirname, pgEarthBuild),
        // 'consts': path.resolve(__dirname, './src/const')
      }
    },
    plugins: [
      new CopyWebpackPlugin([{
        from: path.join(pgEarthSource, pgEarthWorkers),
        to: path.join(staticLibrasDir, 'Workers')
      },{
        from: path.join(pgEarthBuild, 'Assets'),
        to: path.join(staticLibrasDir, 'Assets')
      },{
        from: path.join(pgEarthBuild, 'Widgets'),
        to: path.join(staticLibrasDir, 'Widgets')
      },{
        from: path.join(pgEarthBuild, 'ThirdParty/Workers'),
        to: path.join(staticLibrasDir, 'ThirdParty/Workers')
      }]),

      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 下面是下载的插件的配置
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5,
        minChunkSize: 100
      }),

      new webpack.DefinePlugin({
        PGEARTH_BASE_URL: JSON.stringify(`${publicPath}${staticLibrasDir}`),
      })
    ],
    module: {
      unknownContextRegExp: /^("|')\.\/.*?\1$/,
      unknownContextCritical: false
    }
  },
  devServer: {
    proxy: { // 萤石云视频接口配置代理
      '/ys7': {
        'target': 'https://open.ys7.com', //天气接口地址
        'secure': false, // false为http访问，true为https访问
        'changeOrigin': true, // 跨域访问设置，true代表跨域
        'pathRewrite': { // 路径改写规则
          '^/ys7': '' // 以/ys7/为开头的改写为''
        }
      },
      '/bd': {
        'target': 'http://112.74.87.74', //北斗视频接口
        'secure': false, // false为http访问，true为https访问
        'changeOrigin': true, // 跨域访问设置，true代表跨域
        'pathRewrite': { // 路径改写规则
          '^/bd': '' // 以/bd/为开头的改写为''
        }
      }
    }
  }
}
