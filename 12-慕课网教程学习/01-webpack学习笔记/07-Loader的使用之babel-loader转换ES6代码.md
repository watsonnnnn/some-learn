# 使用Babel-loader转换ES6代码

## 安装babel-loader(去官网查看)

`npm install babel-loader babel-core --save-dev`

## 在webpack.config.js配置文件中的module像中配置babel-loader

    var htmlWepackPlugin = require('html-webpack-plugin');
    var path = require('path');
    
    module.exports = {
      entry: {
        'main': './src/scripts/main.js',
        'a': './src/scripts/a.js',
        'b': './src/scripts/b.js',
        'es6': './src/scripts/es6.js'
      },
      output: {
        path: './dist/js',
        filename: '[name]-[chunkhash].js'
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            include: [
              path.resolve(__dirname, 'src')  // 对src目录下的ES最新语法进行转换,使其成为浏览器能够识别的语法
            ],
            loader: 'babel-loader', //babel-loader去其官网查看文档
            query: {
              presets: ['latest'] // 对最新版本的ES语法进行转译, npm install --save-dev babel-preset-latest
            }
          }
        ]
      },
      plugins: [
        new htmlWepackPlugin({
          title: 'index',
          chunks: ['main'],
          filename: '../../assets/index.html'
        })
      ]
    }