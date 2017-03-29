# 处理项目中的less文件和sass文件

## 安装对应的loader

`npm i less-loader --save-dev`, `npm i sass-loader --save-dev`

## 使用less-loader和sass-loader

    使用方法同处理css的方法。

需要注意的是:

    postcss-loader的处理过程必须在css预处理器的loader的后面,即先进行预处理器处理,再进行postcss处理(在postcss-loader
    文档中有相应说明)。对应在配置文件中,即需要将 预处理器loader写在postcss-loader的后面(因为串联loader是从右往左执行)!
    
    {
        test: /\.less$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'style!css!postcss!less'  //loader可以省略-loader后缀,串联使用多个loader,loader执行顺序是从右往左!
      }
    
    