/***
 * 1. String对象的正则方法
 */
// var str = 'hello javascript,hello RegExp!';
// console.log(str.search(/hello/));  // 0
// console.log(str.search(/regexp/i)); //23
//
// console.log(str.match(/hello/));  //[ 'hello', index: 0, input: 'hello javascript,hello RegExp!' ]
// console.log(str.match(/hello/g));  //[ 'hello', 'hello' ]
//
// var str2 = str.replace(/hello/, 'hi');
// var str3 = str.replace(/hello/g, 'hi');
// console.log(str2);  //hi javascript,hello RegExp!
// console.log(str3);  //hi javascript,hi RegExp!
// console.log(str);   //hello javascript,hello RegExp!
//
// var a = str.split(/hello/);  //[ '', ' javascript,', ' RegExp!' ]
// console.log(a);

/**
 * 2. RegExp对象的方法
 * */
// var r = /hello/i;
// console.log(r.test('Hello js!'));
// console.log(r.test('hello js!'));
//
// console.log(r.exec('Hello js, hello RegExp'));//[ 'Hello', index: 0, input: 'Hello js, hello RegExp' ]
//
// r = /hello/g;
// console.log(r.exec('Hello js, hello RegExp'));//[ 'hello', index: 10, input: 'Hello js, hello RegExp' ]


/**
 * 3. 正则中的方括号
 * */

// var r = /[12345]/;
// console.log(r.test('aaa12'));//true
//
// r = /[^0a]/;
// console.log(r.test('123')); // true
// console.log(r.test('a')); // false
// console.log(r.test('123a')); // true
//
// var str = "abcde";
// console.log(str.match(/[bcd][bcd]/)); // [“bc”, index: 1, input: “abcde”]

/**
 * 4. 元字符
 * */
// console.log('hello'.match(/\w/));  //[ 'h', index: 0, input: 'hello' ]
// console.log('hello'.match(/\w/g));  //[ 'h', 'e', 'l', 'l', 'o' ]
// console.log('hello'.match(/\w+/));  //[ 'hello', index: 0, input: 'hello' ]
// var str = 'abcde111vvv';
// console.log(/\D+/g.exec(str)); // [“abcde”, index: 0, input: “abcde111vvv”]
// str = '     hello ';
// console.log(str.match(/\s/g));//[ ' ', ' ', ' ', ' ', ' ', ' ' ]
// str='Is this all \nthere is?';
// console.log(/\n/g.exec(str)); // [ '\n', index: 12, input: 'Is this all \nthere is?' ]

/**
 * 5. 量词
 * */
// console.log(/\d+/.exec('12abc'));
// var str = "hello longen";
// console.log(str.match(/l+/g)); //["ll", "l"]
// console.log(str.match(/ll*/g));

/**
 * 6. 贪婪匹配与非贪婪匹配
 * */
// var s = 'hello 100, hello 1000, hello 10000';
// console.log(s.match(/\d{3,}/g));  //贪婪匹配 => [ '100', '1000', '10000' ]
// console.log(s.match(/\d{3,}?/g)); //非贪婪匹配 => [ '100', '100', '100' ]
//
// s = 'hello,我是中国人。hello,我是中国人!!';
// console.log(s.match(/hello.*/g));  //[ 'hello,我是中国人。hello,我是中国人!!' ]
// console.log(s.match(/hello.*?/g));  //[ 'hello', 'hello' ]

/**
 * 7. 捕获组
 * */
// 使用replace替换 使用分组 把内容替换
var num = "11 22";
var n = num.replace(/(\d+)\s*(\d+)/, "$2 $1");
console.log(n); // 22 11
