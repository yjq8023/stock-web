const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = merge(common, {
  plugins:[//清除dis文件
    new CleanWebpackPlugin()
  ],
  optimization: {//分割代码
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name:'vendors/vendors.js'
        },
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      },
    },
  }
});