# Redux II Mini

---

## Topics

* Middleware and applyMiddleware
* redux-thunk
* redux-logger

## Description

* Notice the file structure. There are certainly many ways by which one could layout an application.
* This pattern is commonly used:

```
src -
  actions
    - index.js
  components -
    - index.js
    - App.js
  reducers
    - index.js
  styles
    - App.css
```

## Initialize Project

* The purpose of this mini-project is to expose you to the world of asyncronous Redux.
* **Notice** the `package.json`. We have included a few new packages here for you.

  * `redux-thunk redux-logger and axios`.

* `axios` isn't something new to you, you've used it before to make **Asynchronous JavaScript and XML** requests.
* `redux-thunk` `redux-logger` are the technologies you'll be introduced to here.

## middlware

* Simply put, middleware is software that sits between our application and other pieces of technology we use as developers.
* Consider something we can use to augment the powers of Redux. `redux` has a package you can use called `applyMiddleware` that will allow you to install utilities to help you achieve specific tasks.
* We can pull in the `applyMiddleware` function directly from `redux`.

```
import { applyMiddleware, createStore } from 'redux';
```

* We're going to use this to pass in our `redux-thunk` and `redux-logger` packages.

  ## redux-thunk

* [redux-thunk](https://github.com/gaearon/redux-thunk) is a package that was built by the author of Redux _Dan Abramov_ to handle Async requests in Recux.
* **What is it?** - `redux-thunk` is a middleware that we can plug into our `createStore()` method when setting up our Redux application.
* **Why do we need it?** Well, Dan himself argues that if you have to ask that question you probably don't need it. However, the average single-page-application deals with `HTTP` requests and often times, we don't have the data back from the server we need in time for use in a synchronous flow. `redux-thunk` allows us to turn our action creators into async functions by granting them the ability to return 'functions' instead of plain objects.
* **How do we use it?** It's pretty simple really.

```
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { someCoolReducer } from './reducers';

const store = createStore(someCoolReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

* instead of passing our initial state directly to our `createStore()` function, we can pass it `applyMiddleware` as a second argument.
* Then, anything we add to `applyMiddleware` we'll have access to once we pass it to our store and set it as a property on the `<Provider />` component.
* Set up is really that simple. The real difficulties lie in re-design of our `action-creators`.
* Instead of returning a simple object every time, any `http request` sent out can be done within an action creator and that function can now return another function.
* This would look a lot like this.

```
function myCleverAction = () => {
  const request = axios.get('https://someRadUrlAPI.com/api/coolness);
  return (dispatch) => {
    request.then(({data}) => {
      dispatch({type: GET_COOL_THING, payload: data.things});
    })
    .catch(err => {
      dispatch({type: ERROR_GETTING_THINGS, error: err});
    });
  };
};
```

* This is an `http` request, and at this point in time, it is a promise.
* Our promise resolves here with data in this .then block
* Now we just call the `dispatch` method which has ben exposed to us through our `thunk` middleware.
* This looks like a lot of boiler plate, but it's actually quite a controlled, and eloquent solution to a big problem that `cross-site-scripting` and `http` requesting often cause.
  ## redux-logger