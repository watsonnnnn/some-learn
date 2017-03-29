# Presentational Components

React组件中开发中最好的实践是: 最上层组件用来处理业务逻辑,并将数据通过`props`传递给子组件。
子组件不应该将任何业务处理逻辑硬编码在组件实现代码中,而应该仅仅根据获取的`props`来进行展示,
即,子组件最好都仅仅只是`Presentational Components`。