# Reducers

`reducers`必须是`pure function`,它接受两个参数: 整个应用中先前的state和派发的一个action, 然后返回整个应用的新的state。
由于它是`纯函数`,所以不能改变prevState!!!