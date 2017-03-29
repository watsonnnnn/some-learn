## document.write

## 使用场景

#### 1. 第三方合作
```
<div id="third">
    <!--如果是A合作方需要插入iframe-->
    iframe
    <!--如果是B合作方需要插入ul-->
    ul[列表内容]
</div>
```
如果这段代码放在前端处理，不使用后端模板，用document.write可以轻松实现，当然实现的方式很多种，
这里只是说明document.write可以胜任。
```
<div id="third">
    <script>
        if(A){
            document.write('iframe')
        }
        if(B){
            document.write('ul')
        }
    </script>
</div>
```

#### 2. 广告
一般广告代码中都是使用document.write来加载第三方广告，比如百度联盟的广告。通常都是这样用。
```
<div id="ad">
<!--corp.js会使用document.write将广告输出到这个位置-->
<script src="http://baidu.com/corp.js">
</div>
```

## 注意事项
如果看完了使用场合是不是觉得了解document.write了呢？其实不然，document.write的引入时机很重要。

还是看上述场景的案例，如果第一个不是内联的script，而是在js文件里写的呢？
在js文件里的写法有2种:
```
一种是DOMContentLoaded或onload之后使用write，毫无疑问页面被清空了，
另一种则是直接执行的write，具体write的内容在页面处于什么位置要取决于这个js引入的位置。
```

第二个案例，如果js是异步引入的（加async或者动态加入的），里面的document.write因安全原因是无法工作的。
```
Failed to execute 'write' on 'Document': It isn't possible to write into a document 
from an asynchronously-loaded external script unless it is explicitly opened.
```

## 工作原理
在弄清楚write的原理之前我们先看几种写法。

head中
```
<head>
<meta charset="UTF-8">
<script type="text/javascript">
document.write('<p>test</p>')
</script>
</head>
<!--请问上述代码在HTML中的什么位置？-->
```

body中
```
<div id="test">
<script type="text/javascript">
<!-- 直接写 -->
document.write('hello world');
<!-- 子节点 -->
var s=document.createElement('script');
s.text='document.write("c")'
document.getElementById('test').appendChild(s)
 </script>
</div>
<!-- 请问这两种写法的结果分别是什么？有区别吗？ -->
```

同步js
```
<script src="http://cucygh.github.io/post.js" charset="utf-8"></script>
<!-- 脚本中有write操作，输出的内容在什么位置？-->
```

异步js
```
<script src="http://cucygh.github.io/post.js" async charset="utf-8"></script>
<!-- 脚本中有write操作，是否能正常输出，如果不能，有什么好的办法？-->
```

### 接下来我们看下document.write的工作原理。

1. 页面在loading状态，按照自上而下的顺序依次解析script，如果遇到write直接输出，
所以放在head的write都是在body顶部展示的。

2. 页面在loaded状态，即使没有调用document.open,document.write操作也会自动调用document.open方法从而将页面清空了。
有的同学说将document.open=function(){}是不是可以避免，结论是No。

```
Note: as document.write writes to the document stream, calling document.write on a closed (loaded)
document automatically calls document.open, which will clear the document.
```

所以使用document.write一定要知道执行的时机。


## 避免document.write
在文档中特别是在早期使用document.write() 获得外部资源，将显著增加网页显示的时间。

## 详细说明

现代浏览器使用推测解析器更有效地发现在HTML标记引用的外部资源。这些推测解析器有助于减少网页的加载时间。
由于推测解析器快、轻，他们不执行JavaScript。因此，使用JavaScript的document.write()来获取外部资源使得
它不可能为推测解析器发现这些资源，这样会推迟这些资源的下载、解析和渲染。

```
在外部JavaScript资源使用document.write()是特别昂贵的，因为它序列化外部资源的下载。
浏览器必须在执行document.write()获取额外的外部资源之前下载、解析和执行第一个外部JavaScript资源。
例如，如果外部JavaScript资源first.js包含以下内容：

document.write('<script src="second.js"><\/script>');

first.js和second.js的下载在所有浏览器将被序列。
```
使用下面描述的推荐技术之一，可以减少阻塞和序列这些资源，从而缩短了显示页面的时间。

## 建议

#### 直接在HTML标记声明资源
```
在HTML标记声明资源允许推测解析器发现这些资源。
```

#### 使用异步资源更好
```
在某些情况下，可能无法在HTML中直接声明资源。
例如，如果在客户端上动态地确定资源的URL，JavaScript必须被用来构造该URL。在这些情况下，尽量使用异步加载技术。
```

#### 使用“易用的iframe”
```
在某些情况下，例如不能用其他推荐技术加载旧代码的优化，它可能无法避免的document.write()。
在这种情况下，易用的iframe可以用来避免阻塞主页。

易用的iframe是一个与他父文档具有相同的起源的iframe。在易用的iframe里引用的资源与主页上引用的资源并行加载。
因此，在易用的iframe里调用document.write()不会阻止父页面的加载。
尽管不堵父页面，在易用iframe里使用document.write()仍然可以减慢IFRAME里的内容加载，
所以其他推荐技术应优先于“易用的iframe”技术。
```