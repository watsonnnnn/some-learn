# pure functions

`pure functions`是指: 对于一个函数,它的返回结果只取决于参数,只要参数相同,每次返回值都相同,不会有其他副作用,不会进行数据库操作或网络操作。
并且,函数不会修改参数,例如,对于数组参数, 可以通过map函数返回处理后的新值,而不是修改原数组。

`pure functions`都是可预测的(predictable)。

例子:

    //1. Pure functions:
    
    function square(x){
        return x * x;
    }
    
    function squareAll(items){
        return items.map(square);
    }
    
    //2. Impure functions
    function square(x){
        updateXInDatabase(x);
        return x * x;
    }
    
    function squareAll(items){
        for(var i=0;i<items.length;i++){
            items[i]=square(items[i]);
        }
    }
    
    
    