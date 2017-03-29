# Principles of Redux

- The whole state of the application is represented as a javascript object. All changes are explicit.
- The state tree is readonly. It cannot be modified. Instead, anytime you want to change it, you'll have to dispatch an `action`.
`action` is a plain object which represents the state change, it usually should contains an key named 'type'.
- To describe state mutations, you have to write a function that takes the previous state of the application and the 
action been dispatched, and returns the next state of the app. And this function , which is called `Reducer`, has to be pure.