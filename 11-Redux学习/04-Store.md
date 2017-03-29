# Store

## what is a Store? 

The store binds together the three principles of Redux, it holds the current application state object.
It lets you dispatch `actions`, when you create it, you need to specify the `Reducer` that tells how state is 
updated with `actions`.

## Three important methods of Store

- getState
- dispatch
- subscribe

## demo
```
    function counter(state = 0, action) {
        switch (action.type) {
            case 'INCREMENT':
                return state + 1;
                break;
            case 'DECREMENT':
                return state - 1;
                break;
            default:
                return state;
        }
    }

    var {createStore} = Redux;
    var store = createStore(counter);

    console.log(store.getState()); // get state of the app initially

    document.addEventListener('click', function () {
        store.dispatch({type: 'INCREMENT'});   // dispatch an action
    })

    store.subscribe(function () {   // subscribes to the change of the state
        document.body.innerText = store.getState();   // get the state of the app
    });
```