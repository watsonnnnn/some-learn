# 自动生成项目的HTML文件(使用webpack插件)

多模块打包时,最终生成的模块文件名为带有chunkhash的名称,在html文件中引用某个js文件时,不可能每次都去手动书写script标签src的名称,
而是必须要自动生成html文件并对模块进行引用,这需要使用到webpack的插件(plugin)。

# 使用html-webpack-plugin插件自动生成index.html文件并自动对模块进行引用

1. 安装插件: `npm install html-webpack-plugin --save-dev`
2. 使用插件: 在webpack.config.js配置文件中先引用对应插件,然后对`plugins`项进行配置。注意:每个插件的使用方法不一样,需要查看对应的文档。

### html-webpack-plugin最简单的使用方法

    var htmlWepackPlugin = require('html-webpack-plugin');
    
    module.exports = {
      entry: {
        'main': './src/scripts/main.js',
        'a': './src/scripts/a.js',
        'b': './src/scripts/b.js'
      },
      output: {
        path: './dist/js',
        filename: '[name]-[chunkhash].js'
      },
      plugins: [
        new htmlWepackPlugin()  // 生成的html文件默认也会指向output的path中定义的路径
      ]
    }
    
此时会在dist/js/目录下生成index.html文件,并且自动引用所有打包的模块。

### 自动生成html的文件名、路径以及引用的模块名

    var htmlWepackPlugin = require('html-webpack-plugin');
    
    module.exports = {
      entry: {
        'main': './src/scripts/main.js',
        'a': './src/scripts/a.js',
        'b': './src/scripts/b.js'
      },
      output: {
        path: './dist/js',
        filename: '[name]-[chunkhash].js'
      },
      plugins: [
        new htmlWepackPlugin({
          title:'index',
          chunks: ['main'],
          filename: '../../assets/index.html'
        })
      ]
    }
    
最终会在项目的assets目录下生成index.html文件,并且正确引用了所有模块中的main模块,如下所示:

    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>index</title>
      </head>
      <body>
      <script type="text/javascript" src="../dist/js/main-ee771726c4b96d689247.js"></script></body>
    </html>

### html-webpack-plugin插件相关使用文档

    html-webpack-plugin还有很多配置,例如指定将script标签注入到页面的head标签还是body标签,使用ejs模板并在plugin中传递参数,等等。
    具体可以在其github官网中找到。

https://webpack.js.org/plugins/html-webpack-plugin/

https://github.com/jantimon/html-webpack-plugin#configuration

## 高级用法: 使用html-webpack-plugin注入内联js代码和内联样式

网上搜一下相关内容。

