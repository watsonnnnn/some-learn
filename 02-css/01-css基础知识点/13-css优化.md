### CSS 优化主要是四个方面：

#### 1. 加载性能
```
这个方面相关的 best practice 太多了，网上随便找一找就是一堆资料，
比如不要用 import 啊，压缩啊等等，主要是从减少文件体积、减少阻塞加载、提高并发方面入手的，
任何 hint 都逃不出这几个大方向。
```

#### 2. 选择器性能
```
可以参考 GitHub 的这个分享 https://speakerdeck.com/jonrohan/githubs-css-performance，
但 selector 的对整体性能的影响可以忽略不计了，selector 的考察更多是规范化和可维护性、健壮性方面，
很少有人在实际工作当中会把选择器性能作为重点关注对象的，但也像 GitHub 这个分享里面说的一样——知道总比不知道好。
```

#### 3. 渲染性能
```
渲染性能是 CSS 优化最重要的关注对象。页面渲染 junky 过多？看看是不是大量使用了 text-shadow？
是不是开了字体抗锯齿？CSS 动画怎么实现的？合理利用 GPU 加速了吗？
什么你用了 Flexible Box Model？有没有测试换个 layout 策略对 render performance 的影响？
这个方面搜索一下 CSS render performance 或者 CSS animation performance 也会有一堆一堆的资料可供参考。
```

#### 4.可维护性、健壮性
```
命名合理吗？结构层次设计是否足够健壮？对样式进行抽象复用了吗？
优雅的 CSS 不仅仅会影响后期的维护成本，也会对加载性能等方面产生影响。
这方面可以多找一些 OOCSS（不是说就要用 OOCSS，而是说多了解一下）等等不同 CSS Strategy 的信息，取长补短。
```