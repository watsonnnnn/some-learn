## String对象支持的正则表达式方法

### 1. search()方法；该方法用于检索字符串中指定的子字符串，或检索与正 则表达式相匹配的字符串。

基本语法：`stringObject.search(regexp);`

```
@param 参数regexp可以需要在stringObject中检索的字符串，也可以 是需要检索的RegExp对象。

@return(返回值) stringObject中第一个与regexp对象相匹配的子串的起 始位置。
如果没有找到任何匹配的子串，则返回-1；

注意：search()方法不执行全局匹配，它将忽略标志g，同时它也没有regexp对象的lastIndex的属性，
且总是从字符串开始位置进行查找，总是返回的是stringObject匹配的第一个位置。
```

```
var str = "hello world,hello world";
// 返回匹配到的第一个位置(使用的regexp对象检索)
console.log(str.search(/hello/)); // 0
// 没有全局的概念 总是返回匹配到的第一个位置
console.log(str.search(/hello/g)); //0
 
console.log(str.search(/world/)); // 6
 
// 也可以是检索字符串中的字符
console.log(str.search("wo")); // 6
 
// 如果没有检索到的话，则返回-1
console.log(str.search(/longen/)); // -1
 
// 我们检索的时候 可以忽略大小写来检索
var str2 = "Hello";
console.log(str2.search(/hello/i)); // 0
```



### 2. match()方法；该方法用于在字符串内检索指定的值，或找到一个或者多个正则表达式的匹配。
该方法类似于indexOf()或者lastIndexOf(); 但是它返回的是指定的值，而不是字符串的位置；

基本语法：`stringObject.match(searchValue) 或者stringObject.match(regexp)`
```
   @param(参数)  searchValue 需要检索字符串的值；  regexp: 需要匹配模式的RegExp对象；

   @return(返回值) 存放匹配成功的数组; 
   
   - 它可以全局匹配模式，全局匹配的话，它返回的是一个数组。
   - 如果没有找到任何的一个匹配，那么它将返回的是null；
   - 如果不是全局匹配, 返回的数组内有三个元素，第一个元素的存放的是匹配的文本，
   还有二个对象属性:
   index属性表明的是匹配文本的起始字符在stringObject中的位置；
   input属性声明的是对stringObject对象的引用；
```


### 3. replace()方法：该方法用于在字符串中使用一些字符替换另一些字符，或者替换一个与正则表达式匹配的子字符串；

基本语法：`stringObject.replace(regexp/substr,replacement);`

@param(参数) 
```
    regexp/substr; 字符串或者需要替换模式的RegExp对象。
    replacement：一个字符串的值，被替换的文本或者生成替换文本的函数。
```

   @return(返回值) 
```
   返回替换后的新字符串
```

注意：
字符串的stringObject的replace()方法执行的是查找和替换操作，
替换的模式有2种，既可以是字符串，也可以是正则匹配模式。
如果是`正则匹配模式的话，那么它可以加修饰符g,代表全局替换`; `否则的话，它只替换第一个匹配的字符串`；

replacement 既可以是字符串，也可以是函数，如果它是字符串的话，那么匹配的将与字符串替换，replacement中的$有具体的含义，如下：

`$1,$2,$3….$99` 含义是：与regexp中的第1到第99个子表达式相匹配的文本。

`$&` 的含义是：与RegExp相匹配的子字符串。

`lastMatch或RegExp[“$_”]`的含义是：返回任何正则表达式搜索过程中的最后匹配的字符。

`lastParen或 RegExp[“$+”]`的含义是：返回任何正则表达式查找过程中最后括号的子匹配。

`leftContext或RegExp[“$`”]`的含义是：返回被查找的字符串从字符串开始的位置到最后匹配之前的位置之间的字符。

`rightContext或RegExp[“$'”]`的含义是：返回被搜索的字符串中从最后一个匹配位置开始到字符串结尾之间的字符。

示例代码:
```
var str = "hello world";
// 替换字符串
var s1 = str.replace("hello","a");
console.log(s1);// a world
// 使用正则替换字符串
var s2 = str.replace(/hello/,"b");
console.log(s2); // b world

// 使用正则全局替换 字符串
var s3 = str.replace(/l/g,'');
console.log(s3); // heo word

// $1,$2 代表的是第一个和第二个子表达式相匹配的文本
// 子表达式需要使用小括号括起来,代表的含义是分组
var name = "longen,yunxi";
var s4 = name.replace(/(\w+)\s*,\s*(\w+)/,"$2 $1");
console.log(s4); // "yunxi,longen"

// $& 是与RegExp相匹配的子字符串
var name = "hello I am a chinese people";
var regexp = /am/g;
if(regexp.test(name)) {
    //返回正则表达式匹配项的字符串
    console.log(RegExp['$&']);  // am

    //返回被搜索的字符串中从最后一个匹配位置开始到字符串结尾之间的字符。
    console.log(RegExp["$'"]); // a chinese people

    //返回被查找的字符串从字符串开始的位置到最后匹配之前的位置之间的字符。
    console.log(RegExp['$`']);  // hello I 

    // 返回任何正则表达式查找过程中最后括号的子匹配。
    console.log(RegExp['$+']); // 空字符串

    //返回任何正则表达式搜索过程中的最后匹配的字符。
    console.log(RegExp['$_']);  // hello I am a chinese people
}

// replace 第二个参数也可以是一个function 函数
var name2 = "123sdasadsr44565dffghg987gff33234";
name2.replace(/\d+/g,function(v){
    console.log(v); 
    /*
     * 第一次打印123
     * 第二次打印44565
     * 第三次打印987
     * 第四次打印 33234
     */
});
/*
 * 如下函数，回调函数参数一共有四个
 * 第一个参数的含义是 匹配的字符串
 * 第二个参数的含义是 正则表达式分组内容，没有分组的话，就没有该参数,
 * 如果没有该参数的话那么第四个参数就是undefined
 * 第三个参数的含义是 匹配项在字符串中的索引index
 * 第四个参数的含义是 原字符串
 */
 name2.replace(/(\d+)/g,function(a,b,c,d){
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
    /*
     * 如上会执行四次，值分别如下(正则使用小括号，代表分组)：
     * 第一次： 123,123,0,123sdasadsr44565dffghg987gff33234
     * 第二次： 44565,44565,11,123sdasadsr44565dffghg987gff33234
     * 第三次： 987,987,22,123sdasadsr44565dffghg987gff33234
     * 第四次： 33234,33234,28,123sdasadsr44565dffghg987gff33234
     */
 });
```



### 4. split()方法: 该方法把一个字符串分割成字符串数组。

基本语法如：`stringObject.split(separator,howmany);`

@param(参数) 
```
   1. separator[必填项]，字符串或正则表达式，该参数指定的地方分割stringObject; 

   2. howmany[可选] 该参数指定返回的数组的最大长度，如果设置了该参数，返回的子字符串不会多于这个参数指定的数组。
   如果没有设置该参数的话，整个字符串都会被分割，不考虑他的长度。
```

@return(返回值) 
```
  一个字符串数组。该数组通过在separator指定的边界处将字符串stringObject分割成子字符串。
```



示例代码
```
ar str = "what are you doing?";
// 以" "分割字符串
console.log(str.split(" "));
// 打印 ["what", "are", "you", "doing?"]
 
// 以 "" 分割字符串
console.log(str.split(""));
/*
 * 打印：["w", "h", "a", "t", " ", "a", "r", "e", " ", "y", "o", "u", " ", "d", "o", "i", "n", 
 * "g", "?"]
 */
// 指定返回数组的最大长度为3
console.log(str.split("",3));
// 打印 ["w", "h", "a"]
```