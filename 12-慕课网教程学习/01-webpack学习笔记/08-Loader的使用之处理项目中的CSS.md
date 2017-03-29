# 处理项目中的CSS

## 安装style-loader和css-loader

`npm install style-loader css-loader --save-dev`

## 使用style-loader和css-loader

`css-loader`使webpack可以处理在js文件中引用的css文件,
`style-loader`将生成的样式插入到html文件head的style标签中。
多个loader可以串联使用,例如`style-loader!css-loader`

## 使用postcss-loader自动添加浏览器前缀

有些比较新的css样式在不同浏览器下使用时需要添加对应的前缀,手动添加太麻烦,可以使用`postcss-loader`自动完成。
具体使用方法可以去npm官网搜索`postcss-loader`查看其文档说明!

## postcss-loader使用说明(根据其官网说明)

    1. 在样式表所在目录下建立postcss.config.js,内容如下:
    module.exports = {
      plugins: [
        require('postcss-smart-import')({/* ...options */}),
        require('precss')({/* ...options */}),
        require('autoprefixer')({/* ...options */})
      ]
    }
    根据配置文件内容可知,需要安装postcss-smart-import、precss、autoprefixer三个npm插件
    
    2. 在webpack.config.js文件中配置loader
     {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'style-loader!css-loader!postcss-loader'  //串联使用多个loader,loader执行顺序是从右往左!
      }

这样,webpack就会给需要浏览器前缀的样式自动添加上对应的前缀。

## loader参数的使用

在上述例子中,如果将需要加浏览器前缀的样式定义在另外一个css文件中,然后通过`@import`命令引入到另一个css文件,
在打包后的文件中可以发现,通过`@import`命令引入的css文件会生成一个新的style标签,并且并不会经过postcss-loader
的处理,也就是不会自动添加浏览器前缀。这种情况下,可以使用loader参数来修正,webpack.config.js的css Loader配置项
可以修改为: `loader: 'style-loader!css-loader?importLoaders=1!postcss-loader'`。 注: loader参数通过`?`来指定,
本例表示对于import的样式表,指定css-loader后面的1个loader去处理它,即也需要postcss-loader进行处理!


### 本例中整个webpack.config.js文件的内容如下

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
              path.resolve(__dirname, 'src')
            ],
            loader: 'babel-loader', //babel-loader去其官网查看文档
            query: {
              presets: ['latest'] // 对最新版本的ES语法进行转译, npm install --save-dev babel-preset-latest
            }
          },
          {
            test: /\.css$/,
            include: [
              path.resolve(__dirname, 'src')
            ],
            loader: 'style-loader!css-loader?importLoaders=1!postcss-loader'  //串联使用多个loader,loader执行顺序是从右往左!
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
    
使用postcss-loader需要新建postcss.config.js配置文件,详情查看官方文档!!!
