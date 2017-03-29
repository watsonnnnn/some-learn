## this关键字

## 介绍
在这篇文章里，我们将讨论跟执行上下文直接相关的更多细节。讨论的主题就是this关键字。
实践证明，这个主题很难，在不同执行上下文中this的确定经常会发生问题。

许多程序员习惯的认为，在程序语言中，this关键字与面向对象程序开发紧密相关，其完全指向由构造器新创建的对象。
在ECMAScript规范中也是这样实现的，但正如我们将看到那样，在ECMAScript中，this并不限于只用来指向新创建的对象。

## 定义
```
this也是执行上下文中的一个属性(变量对象VO也是执行上下文的一个属性)。
```

```
activeExecutionContext = {
  VO: {...},
  this: thisValue
};
```
这里VO是`变量对象`。

```
this与上下文中可执行代码的类型有直接关系，this值在进入上下文时确定，并且在上下文运行期间永久不变
```

下面让我们更详细研究这些案例：

## 全局代码中的this
在这里一切都简单。在全局代码中，this始终是全局对象本身，这样就有可能间接的引用到它了。
```
// 显示定义全局对象的属性
this.a = 10; // global.a = 10
alert(a); // 10
 
// 通过赋值给一个无标示符隐式
b = 20;
alert(this.b); // 20
 
// 也是通过变量声明隐式声明的
// 因为全局上下文的变量对象是全局对象自身
var c = 30;
alert(this.c); // 30
```

## 函数代码中的this
在函数代码中使用this时很有趣，这种情况很难且会导致很多问题。
```
这种类型的代码中，this值的首要特点（或许是最主要的）是它不是静态的绑定到一个函数。
```

正如我们上面曾提到的那样，`this是进入上下文时确定，在一个函数代码中，这个值在每一次完全不同`。
```
不管怎样，在代码运行时的this值是不变的，也就是说，因为它不是一个变量，
就不可能为其分配一个新值（相反，在Python编程语言中，它明确的定义为对象本身，在运行期间可以不断改变）。
```

```
var foo = {x: 10};
 
var bar = {
  x: 20,
  test: function () {
    alert(this === bar); // true
    alert(this.x); // 20
 
    this = foo; // 错误，任何时候不能改变this的值
    alert(this.x); // 如果不出错的话，应该是10，而不是20
  }
};
 
// 在进入上下文的时候
// this被当成bar对象
// determined as "bar" object; why so - will
// be discussed below in detail
bar.test(); // true, 20
foo.test = bar.test;

// 不过，这里this依然不会是foo
// 尽管调用的是相同的function
foo.test(); // false, 10
```

那么，影响了函数代码中this值的变化有几个因素：

首先，在通常的函数调用中，this是由激活上下文代码的调用者来提供的，即调用函数的父上下文(parent context )。
```
this取决于调用函数的方式。
```

为了在任何情况下准确无误的确定this值，有必要理解和记住这重要的一点。
```
正是调用函数的方式影响了调用的上下文中的this值，没有别的什么
```
（我们可以在一些文章，甚至是在关于javascript的书籍中看到，它们声称：“this值取决于函数如何定义，如果它是全局函数，
this设置为全局对象，如果函数是一个对象的方法，this将总是指向这个对象。–这绝对不正确”）。
继续我们的话题，可以看到，即使是正常的全局函数也会被调用方式的不同形式激活，这些不同的调用方式导致了不同的this值。

```
function foo() {
  alert(this);
}
 
foo(); // global
 
alert(foo === foo.prototype.constructor); // true
 
// 但是同一个function的不同的调用表达式，this是不同的
 
foo.prototype.constructor(); // foo.prototype
有可能作为一些对象定义的方法来调用函数，但是this将不会设置为这个对象。

var foo = {
  bar: function () {
    alert(this);
    alert(this === foo);
  }
};
 
foo.bar(); // foo, true
 
var exampleFunc = foo.bar;
 
alert(exampleFunc === foo.bar); // true
 
// 再一次，同一个function的不同的调用表达式，this是不同的
 
exampleFunc(); // global, false
```
那么，调用函数的方式如何影响this值？为了充分理解this值的确定，需要详细分析其内部类型之一——`引用类型（Reference type）`。

## 引用类型（Reference type）
使用伪代码我们可以将引用类型的值可以表示为拥有两个属性的对象——base（即拥有属性的那个对象），和base中的propertyName 。
```
var valueOfReferenceType = {
  base: <base object>,
  propertyName: <property name>
};
```
引用类型的值只有两种情况：

    当我们处理一个标示符时
    或一个属性访问器
    
需要知道，在该算法的返回值中，总是一个引用类型的值（这对this来说很重要）。
标识符是变量名，函数名，函数参数名和全局对象中未识别的属性名。例如，下面标识符的值：
```
var foo = 10;
function bar() {}
在操作的中间结果中，引用类型对应的值如下：

var fooReference = {
  base: global,
  propertyName: 'foo'
};
 
var barReference = {
  base: global,
  propertyName: 'bar'
};
为了从引用类型中得到一个对象真正的值，伪代码中的GetValue方法可以做如下描述：

function GetValue(value) {
 
  if (Type(value) != Reference) {
    return value;
  }
 
  var base = GetBase(value);
 
  if (base === null) {
    throw new ReferenceError;
  }
 
  return base.[[Get]](GetPropertyName(value));
 
}
内部的[[Get]]方法返回对象属性真正的值，包括对原型链中继承的属性分析。

GetValue(fooReference); // 10
GetValue(barReference); // function object "bar"

属性访问器都应该熟悉。它有两种变体：点（.）语法（此时属性名是正确的标示符，且事先知道），或括号语法（[]）。

foo.bar();
foo['bar']();
在中间计算的返回值中，我们有了引用类型的值。

var fooBarReference = {
  base: foo,
  propertyName: 'bar'
};
 
GetValue(fooBarReference); // function object "bar"
```

引用类型的值与函数上下文中的this值如何相关？——从最重要的意义上来说。 这个关联的过程是这篇文章的核心。 
一个函数上下文中确定this值的通用规则如下：

`在一个函数上下文中，this由调用者提供，由调用函数的方式来决定。`
```
1. 如果调用括号()的左边是引用类型的值，this将设为引用类型值的base对象（base object）;
2. 在其他情况下（与引用类型不同的任何其它属性），这个值为null。

不过，实际不存在this的值为null的情况，因为当this的值为null的时候，其值会被隐式转换为全局对象。
注：第5版的ECMAScript中，已经不强迫转换成全局变量了，而是赋值为undefined。
```

我们看看这个例子中的表现：
```
function foo() {
  return this;
}
 
foo(); // global
```
我们看到在调用括号的左边是一个引用类型值（因为foo是一个标示符）。
```
var fooReference = {
  base: global,
  propertyName: 'foo'
};
```
相应地，this也设置为引用类型的base对象。即全局对象。

同样，使用属性访问器：
```
var foo = {
  bar: function () {
    return this;
  }
};
 
foo.bar(); // foo
```
我们再次拥有一个引用类型，其base是foo对象，在函数bar激活时用作this。

```
var fooBarReference = {
  base: foo,
  propertyName: 'bar'
};
```

但是，用另外一种形式激活相同的函数，我们得到其它的this值。
```
var test = foo.bar;
test(); // global
因为test作为标示符，生成了引用类型的其他值，其base（全局对象）用作this 值。

var testReference = {
  base: global,
  propertyName: 'test'
};
```
现在，我们可以很明确的告诉你，为什么用表达式的不同形式激活同一个函数会不同的this值，
答案在于引用类型（type Reference）不同的中间值。
```
function foo() {
  alert(this);
}
 
foo(); // global, because
 
var fooReference = {
  base: global,
  propertyName: 'foo'
};
 
alert(foo === foo.prototype.constructor); // true
 
// 另外一种形式的调用表达式
 
foo.prototype.constructor(); // foo.prototype, because
 
var fooPrototypeConstructorReference = {
  base: foo.prototype,
  propertyName: 'constructor'
};
另外一个通过调用方式动态确定this值的经典例子：

function foo() {
  alert(this.bar);
}
 
var x = {bar: 10};
var y = {bar: 20};
 
x.test = foo;
y.test = foo;
 
x.test(); // 10
y.test(); // 20
```

## 函数调用和非引用类型
因此，正如我们已经指出，`当调用括号的左边不是引用类型而是其它类型，这个值自动设置为null，结果为全局对象`。

让我们再思考这种表达式：
```
(function () {
  alert(this); // null => global
})();
```
在这个例子中，我们有一个函数对象但不是引用类型的对象（它不是标示符，也不是属性访问器），相应地，this值最终设为全局对象。

更多复杂的例子：
```
var foo = {
  bar: function () {
    alert(this);
  }
};
 
foo.bar(); // Reference, OK => foo
(foo.bar)(); // Reference, OK => foo
 
(foo.bar = foo.bar)(); // global?
(false || foo.bar)(); // global?
(foo.bar, foo.bar)(); // global?
```
为什么我们有一个属性访问器，它的中间值应该为引用类型的值，在某些调用中我们得到的this值不是base对象，而是global对象？

问题在于后面的三个调用，在应用一定的运算操作之后，在调用括号的左边的值不在是引用类型。

第一个例子很明显———明显的引用类型，结果是，this为base对象，即foo。
在第二个例子中，组运算符并不适用，想想上面提到的，从引用类型中获得一个对象真正的值的方法，如GetValue。
相应的，在组运算的返回中———我们得到仍是一个引用类型。这就是this值为什么再次设为base对象，即foo。
第三个例子中，与组运算符不同，赋值运算符调用了GetValue方法。返回的结果是函数对象（但不是引用类型），
这意味着this设为null，结果是global对象。
第四个和第五个也是一样——逗号运算符和逻辑运算符（OR）调用了GetValue 方法，相应地，我们失去了引用而得到了函数。并再次设为global。

## 引用类型和this为null
有一种情况是这样的：当调用表达式限定了call括号左边的引用类型的值， 尽管this被设定为null，但结果被隐式转化成global。
当引用类型值的base对象是被活动对象时，这种情况就会出现。

下面的实例中，内部函数被父函数调用，此时我们就能够看到上面说的那种特殊情况。
`局部变量、内部函数、形式参数储存在给定函数的激活对象中`。
```
function foo() {
  function bar() {
    alert(this); // global
  }
  bar(); // the same as AO.bar()
}
```
活动对象总是作为this返回，值为null——（即伪代码的AO.bar()相当于null.bar()）。
这里我们再次回到上面描述的例子，this设置为全局对象。

有一种情况除外：如果with对象包含一个函数名属性，在with语句的内部块中调用函数。
With语句添加到该对象作用域的最前端，即在活动对象的前面。
相应地，也就有了引用类型（通过标示符或属性访问器）， 其base对象不再是活动对象，而是with语句的对象。
顺便提一句，它不仅与内部函数相关，也与全局函数相关，因为with对象比作用域链里的最前端的对象(全局对象或一个活动对象)还要靠前。
```
var x = 10;
 
with ({
  foo: function () {
    alert(this.x);
  },
  x: 20
}) {
  foo(); // 20
}
 
// because
var  fooReference = {
  base: __withObject,
  propertyName: 'foo'
};
```
同样的情况出现在catch语句的实际参数中函数调用：在这种情况下，catch对象添加到作用域的最前端，即在活动对象或全局对象的前面。
但是，这个特定的行为被确认为ECMA-262-3的一个bug，这个在新版的ECMA-262-5中修复了。
这样，在特定的活动对象中，this指向全局对象。而不是catch对象。
```
try {
  throw function () {
    alert(this);
  };
} catch (e) {
  e(); // ES3标准里是__catchObject, ES5标准里是global 
}
 
// on idea
 
var eReference = {
  base: __catchObject,
  propertyName: 'e'
};
 
// ES5新标准里已经fix了这个bug，
// 所以this就是全局对象了
var eReference = {
  base: global,
  propertyName: 'e'
};
```
同样的情况出现在命名函数（函数的更对细节参考第15章Functions）的递归调用中。
在函数的第一次调用中，base对象是父活动对象（或全局对象），在递归调用中，base对象应该是存储着函数表达式可选名称的特定对象。
但是，在这种情况下，this总是指向全局对象。
```
(function foo(bar) {
  alert(this);
  !bar && foo(1); // "should" be special object, but always (correct) global
})(); // global
```

## 作为构造器调用的函数中的this
还有一个与this值相关的情况是在函数的上下文中，这是一个构造函数的调用。
```
function A() {
  alert(this); // "a"对象下创建一个新属性
  this.x = 10;
}
 
var a = new A();
alert(a.x); // 10

在这个例子中，new运算符调用“A”函数的内部的[[Construct]] 方法，接着，在对象创建后，调用内部的[[Call]] 方法。 
所有相同的函数“A”都将this的值设置为新创建的对象。
```

## 函数调用中手动设置this
在函数原型中定义的两个方法（因此所有的函数都可以访问它）允许去手动设置函数调用的this值。
它们是.apply和.call方法。他们用接受的第一个参数作为this值，this 在调用的作用域中使用。
这两个方法的区别很小，对于.apply，第二个参数必须是数组（或者是类似数组的对象，如arguments，反过来，.call能接受任何参数。
两个方法必须的参数是第一个——this。

例如：
```
var b = 10;
 
function a(c) {
  alert(this.b);
  alert(c);
}
 
a(20); // this === global, this.b == 10, c == 20
 
a.call({b: 20}, 30); // this === {b: 20}, this.b == 20, c == 30
a.apply({b: 30}, [40]) // this === {b: 30}, this.b == 30, c == 40
```
