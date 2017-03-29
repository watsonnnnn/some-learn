# 安装webpack

### Local Installation
`npm install webpack --save-dev`
`npm install webpack@<version> --save-dev`

### Global Installation
`npm install webpack -g`

# 安装webpack后
直接在命令行中使用`webpack`命令，可以查看webpack的所有参数，可以在打包过程中使用这些命令。
例如，`webpack test.js test.bundle.js --progress --display-modules`命令可以显示打包的过程和打包的模块。

# 基础使用
新建一个js文件test.js，webpack最基础的用法可以直接将某个js文件进行打包，例如`webpack test.js test.bundle.js`，
指定要打包的文件和打包后生成的文件名。

# 注
在打包生成的文件中，每个模块由一个数字标识，模块引用其他模块时，通过该数字标识进行引用。



