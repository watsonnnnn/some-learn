var foo = function bar() {
    console.log(bar);   //命名函数表达式的函数名只能在函数体内部访问!!!
}

// foo();  //可以调用
// bar(); //ReferenceError: bar is not defined


