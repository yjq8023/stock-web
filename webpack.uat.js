 const merge = require('webpack-merge');
 const common = require('./webpack.common.js');
 module.exports = merge(common, {
    devServer: {
      hot: true,
      host: '127.0.0.1',
      proxy: {
        "/api": {
          target: "http://127.0.0.1:80",
          changeOrigin: true,
          pathRewrite: {"^/api" : ""}
        },
        "/xl": {
          target: "http://hq.sinajs.cn",
          changeOrigin: true,
          pathRewrite: {"^/xl" : ""}
        }
      }
    },

  });