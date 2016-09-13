
var webpack = require('webpack')
var webpackDevServer = require('webpack-dev-server')
var SpritesmithPlugin = require('webpack-spritesmith')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 源文件入口文件
  entry: {
    entry: './src/javascripts/entry.js'
  },

  // 构建之后的文件目录配置
  output:{
    path: 'static',
   // publicPath:'static',
    filename: 'entyr.js'
  },

  // 插件
  plugins:[
    // 图片合并 支持retina
    // new SpritesmithPlugin({
    //   src:{
    //       cwd: path.resolve(__dirname, './static/images/'),
    //       glob: '*.png',
    //   },
    //   target: {
    //       image: path.resolve(__dirname, './static/images/sprite.[hash].png'),
    //       css: path.resolve(__dirname, './static/stylesheets/style.css')
    //   },
    //   apiOptions: {
    //       cssImageRef: "./static/images/sprite.[hash].png"
    //   },
    //   spritesmithOptions :{
    //     padding:20
    //   },
    //   retina: '@2x'
    // }),

    // new HtmlWebpackPlugin(),
    new HtmlWebpackPlugin({
      title:'webpack App',
      filename: 'index.html',
      template: './src/index.html',
      inject: true
    })
  ],

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
