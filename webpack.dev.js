 const merge = require('webpack-merge');
 const common = require('./webpack.common.js');
 module.exports = merge(common, {
    devServer: {
      hot: true,
      host: '127.0.0.1',
      proxy: {
        "/api": {
          target: "http://43.226.33.31:80",
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