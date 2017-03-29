### RegExp对象表示正则表达式，它是对字符串执行模式匹配的工具

正则表达式的基本语法如下2种：

- 直接量语法：

         /pattern/attributes;

- 创建RegExp对象的语法

         new RegExp(pattern,attributes);

参数：参数pattern是一个字符串，指定了正则表达式的模式；
参数attributes是一个可选的参数，包含属性` g，i，m`，分别使用与`全局匹配`，`不区分大小写匹配`，`多行匹配`；