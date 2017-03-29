# 安装相应的loader

默认情况下，webpack并不能对css文件进行打包，需要安装对应的loader后才能打包样式文件。
可以使用`npm install css-loader style-loader --save-dev`命令来安装loader。

# css-loader的使用

例如，想在test.js文件中引用css文件，可以使用`require('css-loader!./test.css')`命令来引用，
然后使用`webpack test.js test.bundle.js`即可成功打包和引用css文件。

# style-loader的使用
使用上述`require('css-loader!./test.css')`可以在js模块中引入样式文件，但是在html文件中引用最终生成的test.bundle.js文件时，
test.css文件中的样式并不会生效！为了使样式生效，还必须使用到style-loader，做法是在引入css样式文件的前面加上style-loader，
即`require('style-loader!css-loader!./test.css') `。

## 注
使用style-loader和css-loader打包和引入样式文件后，通过查看html页面的源代码可以发现，
在css文件中书写的样式被webpack自动以style标签的样式插入在了页面的head标签中，这就是style-loader的作用。

## 总结
综合，可以看书，css-loader的作用是使webpack能够处理css文件，而style-loader得作用则是新建一个style标签，
将处理后的样式插入到网页的head标签中。
