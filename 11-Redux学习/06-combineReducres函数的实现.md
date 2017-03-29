# combineReducers函数实现原理

这对使用Redux不是必须的,但是能够了解到`函数式编程`的思想,`一个函数可以使用其他函数作为参数,并且返回新的函数`。
这个思想对于使用Redux很有帮助。

    const combineReducers = (reducers) => {
        // 返回一个新的Reducer
        return (state = {}, action) => {
            return Object.keys(reducers).reduce(
                    (nextState, key) => {
                        nextState[key] = reducers[key](
                                state[key],
                                action
                        );
                        return nextState;
                    },
                    {}
            );
        };
    };