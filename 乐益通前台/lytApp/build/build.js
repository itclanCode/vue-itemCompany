// https://github.com/shelljs/shelljs
// 检查NodeJS和npm的版本
require('./check-versions')()
// 执行Unix命令行的插件
require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')
// 用于在控制台输出带颜色字体的插件
var chalk = require('chalk')

console.log(
  chalk.blue( '  Tip:\n' +
    '  Built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n')
)

var spinner = ora('building for production...')
// 开启loading动画
spinner.start()

// 输出文件的目标文件夹
var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
// 递归删除旧的目标文件夹
rm('-rf', assetsPath)
// 重新创建文件夹
mkdir('-p', assetsPath)
// 将static文件夹复制到输出的目标文件夹
cp('-R', 'static/*', assetsPath)

// webpack编译
webpack(webpackConfig, function (err, stats) {
  // 停止loading动画
  spinner.stop()
  if (err) throw err
  // 没有出错则输出相关信息
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
