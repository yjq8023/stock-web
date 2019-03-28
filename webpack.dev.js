 const merge = require('webpack-merge');
 const common = require('./webpack.common.js');
 module.exports = merge(common, {
    devServer: {
      hot: true,
      host: '127.0.0.1',
      proxy: {
        "/api": {
          target: "http://www.ymxf.xyz:3000",
          changeOrigin: true,
          pathRewrite: {"^/api" : ""}
        }
      }
    },

  });