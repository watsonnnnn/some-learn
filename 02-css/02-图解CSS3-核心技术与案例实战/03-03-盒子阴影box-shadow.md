## 盒子阴影  box-shadow

语法规则:

```
box-shadow: none | [inset x-offset y-offset blur-radius spread-radius color] , 
            [inset x-offset y-offset blur-radius spread-radius color]
            
设置多个投影用逗号隔开。

1. none 表示不设置阴影
2. inset: 可选项,不设置该值表示外阴影;设置该值表示内阴影
3. x-offset: 水平偏移量,取正值,阴影设置在元素右边(右边有阴影效果);取负值,阴影在元素左边(左边阴影效果)
4. y-offset: 竖直偏移量,取正值,阴影在元素底部(底部有阴影效果);取负值,阴影在元素顶部(顶部有阴影效果)
5. blur-radius: 可选值,模糊半径
6. spread-radius: 可选值,扩展半径,取正值,阴影扩大;取负值,阴影缩小
7. color: 阴影颜色
```

### 1. 单边阴影效果(都具有5px的模糊半径)
```
<style type="text/css">
    .box-shadow {
        width: 100px;
        height: 50px;
        border-radius: 10px;
        border: 1px solid #ccc;
        margin: 20px;
    }

    .top {
        box-shadow: 0 -5px 5px #bbb;
    }

    .bottom {
        box-shadow: 0 5px 5px #bbb;
    }

    .left {
        box-shadow: -5px 0 5px #bbb;;
    }

    .right {
        box-shadow: 5px 0 5px #bbb;
    }

</style>

<div class="box-shadow top"></div>
<div class="box-shadow right"></div>
<div class="box-shadow bottom"></div>
<div class="box-shadow left"></div>
```


### 2. 扩展半径(spread-radius)的用法
上面设置单边阴影时,加上了5px的模糊半径,可以看到另外其他三边也被加上了淡淡的阴影效果,实际中可能不需要,
此时可以通过`扩展半径(spread-radius)`来消除。
要实现单边阴影效果,通常必须应该配上该属性,设置一定量的扩展半径(负数)来使其他边的阴影缩小!!!

```
<style type="text/css">
    .box-shadow {
        width: 100px;
        height: 50px;
        border-radius: 10px;
        border: 1px solid #ccc;
        margin: 20px;
    }

    .top {
        box-shadow: 0 -5px 5px -2px #bbb;
    }

    .bottom {
        box-shadow: 0 5px 5px -2px #bbb;
    }

    .left {
        box-shadow: 5px 0 5px -2px #bbb;;
    }

    .right {
        box-shadow: -5px 0 5px -2px #bbb;
    }

</style>

<div class="box-shadow top"></div>
<div class="box-shadow right"></div>
<div class="box-shadow bottom"></div>
<div class="box-shadow left"></div>
```


### 3. 四边相同的阴影效果(只需要设置模糊半径和扩展半径(可选)即可)
```
<style type="text/css">
    #four-edge-shadow {
        width: 200px;
        height: 100px;
        border-radius: 10px;
        border: 1px solid #ddd;;
        box-shadow: 0 0 20px 5px #ccc;
    }
</style>

<div id="four-edge-shadow"></div>
```

### 4. 设置多个阴影
```
<style type="text/css">
    #multi-shadow {
        width: 200px;
        height: 100px;
        border-radius: 10px;
        border: 1px solid #ddd;;
        box-shadow: 0 0 10px red,
        0 0 20px green,
        0 0 30px blue;
    }
</style>

<div id="multi-shadow"></div>
```