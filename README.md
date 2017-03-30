# little-learn
a little learning

### about redux
>mapStateToProps是个函数，mapStateToProps = (state,[ownProps])=>{state}
mapDispatchToProps可以是对象，也可以是函数
(dispatch,[ownProps]) = >{onclick:dispatch(action)}
{onclick:actioncreator}

>对于对象的话，在将容器组件绑定到实例组件的时候，会将对象的key作为函数名，直接调用的话会进行dispatch(actioncreator())的操作，发送action

>对于函数的话，就是先执行函数，返回的对象中的keyvalue进行映射，调用key时就是直接调用value所对应的方法
