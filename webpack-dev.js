var webpack = require('webpack')
var webpackDevServer = require('webpack-dev-server')
var SpritesmithPlugin = require('webpack-spritesmith')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  // 本地服务器配置
  devServer:{
    // 本地服务器端口配置
    port: 8081,

    // 启用html5
    historyApiFallback: true,

    // 指定服务根目录
    contentBase:'./static/',

    stats:{
      colors: true,
    }
  }
}