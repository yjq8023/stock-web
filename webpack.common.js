const path=require('path');
const htmlWebpackPlugin=require('html-webpack-plugin');
const webpack=require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports={
  entry:{
    index: './src/js/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test:  /\.(woff|woff2|eot|ttf|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'fonts',
            publicPath: '../fonts'
          }
        }]
      }
    ]
  },
  plugins:[
    new htmlWebpackPlugin({
      filename:`index.html`, //通过模板生成的文件名
      template:`src/index.html`,//模板路径d
      inject:true, //是否自动在模板文件添加 自动生成的js文件链接
      minify:{
        removeComments:true, //是否压缩时 去除注释
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new webpack.ProvidePlugin({//全局注册jquery
      $: "jquery",
      jQuery: "jquery"
    },
      {
        $: "bootstrap",
        Bootstrap: "bootstrap"
      }),
    new MiniCssExtractPlugin({//抽离css文件
      filename:'css/[name].[hash].css' // 设置最终输出的文件名
    }),
    new OptimizeCSSAssetsPlugin({}),//压缩css文件
    // new UglifyJsPlugin({
    //   cache: true,
    //   parallel: true,
    //   sourceMap: true
    // }),
  ],
};