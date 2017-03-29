## RegExp对象的方法

### 1. test()方法：该方法用于检测一个字符串是否匹配某个模式；

基本语法：`RegExpObject.test(str);`
```
@param(参数) str是需要检测的字符串；
@return (返回值) 如果字符串str中含有与RegExpObject匹配的文本的话，返回true，否则返回false；
```

```
var str = "longen and yunxi";
console.log(/longen/.test(str)); // true
console.log(/longlong/.test(str)); //false
 
// 或者创建RegExp对象模式
var regexp = new RegExp("longen");
console.log(regexp.test(str)); // true
```

### 2. exec()方法: 该方法用于检索字符串中的正则表达式的匹配。

基本语法：`RegExpObject.exec(string)`

```
@param(参数)：string【必填项】要检索的字符串。
@return(返回值)：返回一个数组，存放匹配的结果，如果未找到匹配，则返回值为null；
```

`注意`：该返回的数组的第一个元素是与正则表达式相匹配的文本(只会返回第一次匹配的结果)，
该方法还返回2个属性:
- index属性声明的是匹配文本的第一个字符的位置；
- input属性则存放的是被检索的字符串string；
`该方法如果不是全局的话，返回的数组与match()方法返回的数组是相同的`

```
var str = "longen and yunxi";
console.log(/longen/.exec(str)); 
// 打印 ["longen", index: 0, input: "longen and yunxi"]
 
// 假如没有找到的话，则返回null
console.log(/wo/.exec(str)); // null
```