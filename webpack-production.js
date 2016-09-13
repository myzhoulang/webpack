// https://github.com/shelljs/shelljs
require('shelljs/global')
rm('-rf', './static/*');
cp('-R',  './src/tpls', './static/tpls')
cp('-R',  './src/images', './static/images')

var webpack = require('webpack')
var webpackConfig
var merge = require('webpack-merge')
var SpritesmithPlugin = require('webpack-spritesmith')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = {

  // 插件
  plugins:[

    // 启用文件压缩混淆
    new webpack.optimize.UglifyJsPlugin({
      output: {
        // 移除所有注释
        comments: false
      },
      compress: {
        warnings: false
      }
    })

  ],
}
