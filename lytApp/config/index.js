// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  // 构建产品时使用的配置
  build: {
    //webpack的编译环境
    env: require('./prod.env'),
    // 编译输入的index.html文件
    index: path.resolve(__dirname, '../dist/index.html'),
    // webpack输出的目标文件夹路径
    assetsRoot: path.resolve(__dirname, '../dist'),
    // webpack编译输出的二级文件夹
    assetsSubDirectory: 'static',
    // webpack编译输出的发布路径
    assetsPublicPath: './',
    // 使用SourceMap
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    // 默认不打开开启gzip模式
    productionGzip: false,
    // gzip模式下需要压缩的文件的扩展名
    productionGzipExtensions: ['js', 'css']
  },
  // 开发过程中使用的配置
  dev: {
    // webpack的编译环境
    env: require('./dev.env'),
    // dev-server监听的端口
    port: 8768,
    // 启动dev-server之后自动打开浏览器
    autoOpenBrowser: true,
    // webpack编译输出的二级文件夹
    assetsSubDirectory: 'static',
    // webpack编译输出的发布路径
    assetsPublicPath: '/',
    // 请求代理表，在这里可以配置特定的请求代理到对应的API接口
    // 例如将'/api/xxx'代理到'www.example.com/api/xxx'
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    // 是否开启 cssSourceMap
    cssSourceMap: false
  }
}
