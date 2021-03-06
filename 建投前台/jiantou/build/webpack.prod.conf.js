var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
// 用于从webpack生成的bundle中提取文本到特定文件中的插件
// 可以抽取出css，js文件将其与webpack输出的bundle分离
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var env = config.build.env

// 合并基础的webpack配置
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  // 配置webpack的输出
  output: {
    // 编译输出目录
    path: config.build.assetsRoot,
    // 编译输出文件名格式
    filename: utils.assetsPath('js/[name].js'),
    // 没有指定输出名的文件输出的文件名格式
    chunkFilename: utils.assetsPath('js/[id].js')
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  // 配置webpack插件
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // 丑化压缩代码
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // 丑化压缩代码
    new webpack.optimize.OccurrenceOrderPlugin(),
    // extract css into its own file
    // 抽离css文件
    new ExtractTextPlugin(utils.assetsPath('css/[name].css')),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    })
    //// split vendor js into its own file
    //new webpack.optimize.CommonsChunkPlugin({
    //  name: 'vendor',
    //  minChunks: function (module, count) {
    //    // any required modules inside node_modules are extracted to vendor
    //    return (
    //      module.resource &&
    //      /\.js$/.test(module.resource) &&
    //      module.resource.indexOf(
    //        path.join(__dirname, '../node_modules')
    //      ) === 0
    //    )
    //  }
    //}),
    //// extract webpack runtime and module manifest to its own file in order to
    //// prevent vendor hash from being updated whenever app bundle is updated
    //new webpack.optimize.CommonsChunkPlugin({
    //  name: 'manifest',
    //  chunks: ['vendor']
    //})
  ]
})

// gzip模式下需要引入compression插件进行压缩
if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
