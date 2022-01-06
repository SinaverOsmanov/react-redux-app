export function createStore(reducer, initState) {
  let state = initState;
  let observers = [];

  function getState() {
    return state;
  }
  function dispatch(action) {
    state = reducer(state, action);

    for (let i = 0; i < observers.length; i++) {
      const listener = observers[i];
      listener();
    }
  }

  function subscribe(listener) {
    observers.push(listener);
  }

  return { getState, dispatch, subscribe };
}
