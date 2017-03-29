## 边框圆角

`语法: border-radius: none | <length>{1,4} [/ <length>{1,4}] ?`

```
如果反斜杠/存在,则表示/前面设置的圆角的水平方向的半径, /后面表示的是圆角垂直方向的半径;
如果不存在反斜杠,则表示圆角水平和垂直方向的半径一致。

也可以拆开来写:
border-top-left-radius: <length> [/ <length>]
border-top-right-radius: <length> [/ <length>]
border-bottom-right-radius: <length> [/ <length>]
border-bottom-left-radius: <length> [/ <length>]
```

使用border-radius制作特殊形状

##### 1. 圆形
```
1. 元素宽高相等
2. border-radius设置为宽高的一半,或者设置为50%

<style type="text/css">
    .circle {
        width: 100px;
        height: 100px;
        background: #f00;
        border-radius: 50%;
    }
</style>
<div class="circle"></div>
```

##### 2. 半圆
```
1. 元素的宽度为高度的2倍(上、下半圆)或一半(左、右半圆)
2. border-radius设置为宽高中较小的数字

<style type="text/css">
    div {
        background: red;
        margin-bottom: 20px;
    }

    .up-semi-circle {
        width: 100px;
        height: 50px;
        border-radius: 50px 50px 0 0;
    }

    .down-semi-circle {
        width: 100px;
        height: 50px;
        border-radius: 0 0 50px 50px;
    }

    .left-semi-circle {
        width: 50px;
        height: 100px;
        border-radius: 50px 0 0 50px;
    }

    .right-semi-circle {
        width: 50px;
        height: 100px;
        border-radius: 0 50px 50px 0;
    }
</style>

<div class="up-semi-circle"></div>
<div class="down-semi-circle"></div>
<div class="left-semi-circle"></div>
<div class="right-semi-circle"></div>
```

##### 3. 扇形
```
1. 元素宽高相等
2. border-radius只设置一个角,且半径与宽高相等

<style type="text/css">
    .sector-1 {
        width: 50px;
        height: 50px;
        border-radius: 50px 0 0 0;
    }

    .sector-2 {
        width: 50px;
        height: 50px;
        border-radius: 0 50px 0 0;
    }

    .sector-3 {
        width: 50px;
        height: 50px;
        border-radius: 0 0 50px 0;
    }

    .sector-4 {
        width: 50px;
        height: 50px;
        border-radius: 0 0 0 50px;
    }
</style>

<div class="sector-1"></div>
<div class="sector-2"></div>
<div class="sector-3"></div>
<div class="sector-4"></div>
```

##### 4. 椭圆
```
1. 宽度是高度的2倍(水平椭圆)或一半(垂直椭圆)
2. 需要同时设置水平半径和垂直半径
3. 水平半径是垂直半径的2倍(水平椭圆)或一半(竖直椭圆)
4. 水平半径和垂直半径中长的一个等于宽高中长的一个;短的一个等于宽高中短的一个数字


<style type="text/css">
    .ellipse-1 {
        width: 100px;
        height: 50px;
        border-radius: 100px 100px 100px 100px / 50px 50px 50px 50px;
    }

    .ellipse-2 {
        width: 50px;
        height: 100px;
        border-radius: 50px 50px 50px 50px /100px 100px 100px 100px;
    }
</style>

<div class="ellipse-1"></div>
<div class="ellipse-2"></div>
```
