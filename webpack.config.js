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

// 获取执行环境
var env = (process.env.NODE_ENV || '').trim()

if(env === 'dev'){
  webpackConfig = require('./webpack-dev.js')
}else if(env === 'build'){
  webpackConfig = require('./webpack-production.js')
}



module.exports = merge({
  // 源文件入口文件
  // 这里的文件在使用html-webpack-plugin的时候 
  // 会自动将这些资源插入到html中
  entry: {
    entry: './src/javascripts/entry.js',

    // 公共文件
    vendors: [
      './src/dep/angular.js',
      './src/dep/angular-ui-router.js'
    ]
  },

  // 构建之后的文件目录配置
  output:{
    path: 'static',
    publicPath:'../static',
    filename: 'entyr.js',
    chunkFilename: 'js/[name].js'
  },

  // webpack 开始执行之前的处理
  resolve:{

    // 配置别名
    alias:{},

  },

  //  
  module: {
    loaders: [
      // 处理angularjs 模版片段
      {
        test: /\.html$/,
        loader: 'ngtemplate?module=app&relativeTo=/src!html'
      },

      //配置css的抽取器、加载器。'-loader'可以省去   
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css!autoprefixer?{browsers:["last 6 version"]}')
      }

      // 处理html图片
      , {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: "file-loader?name=images/[name].[ext]"
      }
    ]
  },

  // 插件
  plugins:[
    // 合并生成公用文件 .[hash:8]
    new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js')

    // 图片合并 支持retina
    ,new SpritesmithPlugin({
      src:{
          cwd: path.resolve(__dirname, './src/images/'),
          glob: '*.png',
      },
      target: {
          image: './static/images/sprite.[hash].png',
          css: './src/stylesheets/icon.css'
      },
      apiOptions: {
          cssImageRef: "/images/sprite.[hash].png"
      },
      spritesmithOptions :{
        padding:20
      },
      retina: '@2x'
    })

    // 单独使用link标签加载css并设置路径，
    // 相对于output配置中的publickPath  .[hash:8]
    ,new ExtractTextPlugin('stylesheets/[name].[hash:2].css')

    // new HtmlWebpackPlugin(),
    ,new HtmlWebpackPlugin({
      // 生成title
      title:'webpack App',

      // 输出的文件名称 默认index.html 可以带有子目录
      filename: 'index.html',

      // 源文件
      template: './src/index.ejs',

      // 注入资源
      inject: true,

      minify:{
        // 合并多个空格
        collapseWhitespace: true,
        // 删除注释
        removeComments: true,
        // 删除冗余属性
        removeRedundantAttributes: true
      },

    })
  ],
}, webpackConfig)
