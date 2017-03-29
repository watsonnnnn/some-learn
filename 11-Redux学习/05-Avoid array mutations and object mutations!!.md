# Avoid Array mutations and Object mutations

`Reduces应该是纯函数,不能修改参数!`

对于数组,可以使用`slice`,`concat`方法或者是ES6中的`...spread`扩展符返回新数组!
对于对象,可以使用`Object.assign`方法或者`...spread`返回新对象!
