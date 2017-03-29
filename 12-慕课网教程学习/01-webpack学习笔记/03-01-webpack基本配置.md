# webpack.config.js文件

默认情况下，执行webpack命令时，webpack会自动读取配置文件`webpack.config.js`，根据配置文件中的配置项进行打包。也可以自定义配置文件名，使用`webapck --config 配置文件名`来进行打包！

# webpack.config.js文件的基本配置项
    module.exports = {  
      entry: './src/scripts/main.js',  
      output: {  
        path: './dist/js',  
        filename: 'bundle.js'  
      }  
    }
更多配置和使用方法，查看官网的documentation！！！

# 使用npm脚本来指定webpack命令行配置项
全局安装了webpack后，在命令行中直接执行`webpack`命令会显示出该命令的运行选项。
例如，`webpack test.js test.bundle.js --progress --display-modules`命令可以显示打包的过程和打包的模块。
使用了webpack.config.js配置文件后，要想使用这些命令行选项，可以使用npm的scripts脚本选项！！
即在package.json文件下的scripts选项中指定webpack命令行参数。例子如下所示：

    "scripts": {  
      "test": "echo \"Error: no test specified\" && exit 1",  
      "webpack":"webpack --config webpack.config.js --progress --colors --display-modules --display-reasons"  
    },
    
在目录下，执行`npm run webpack`即可进行打包！！！

