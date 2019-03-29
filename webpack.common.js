const path=require('path');
const glob=require('glob');
const htmlWebpackPlugin=require('html-webpack-plugin');
const webpack=require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let oldFiles=glob.sync('./src/*.html');
let files=[];
let entry={};//入口
let config='';
for(let i of oldFiles){
  let houZui=path.extname(i);
  files.push(path.basename(i,houZui))
}

 config={
  entry:entry,
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
  ],
};

for(let k of files){
  entry[k]=`./src/js/${k}.js`;
  let htmlTemplate=new htmlWebpackPlugin({
    filename:`${k}.html`, //通过模板生成的文件名
    template:`src/${k}.html`,//模板路径
    inject:true, //是否自动在模板文件添加 自动生成的js文件链接
    chunks:[k,'vendors','commons'],//根据chunks引入js和css文件
    minify:{
      removeComments:true, //是否压缩时 去除注释,
      // collapseWhitespace: true,
      // removeAttributeQuotes: true
    }
  });
  config.plugins.push(htmlTemplate)
}
module.exports=config;