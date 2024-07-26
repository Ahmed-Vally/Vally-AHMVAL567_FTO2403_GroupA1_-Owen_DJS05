const initialState = {
    count: 0,
  };
  
  // Different types of actions
  const ADD = "ADD";
  const SUBTRACT = "SUBTRACT";
  const RESET = "RESET";
  
  // Handle actions and update state
  function reducer(state = initialState, action) {
    switch (action.type) {
      case ADD:
        return { ...state, count: state.count + 1 };
      case SUBTRACT:
        return { ...state, count: state.count - 1 };
      case RESET:
        return { count: 0 };
      default:
        return state;
    }
  }
  
  // Creates the store
  function initializeStore(reducer) {
    let currentState = initialState;
    let listeners = [];
    return {
      getState: () => currentState,
      dispatch: (action) => {
        currentState = reducer(currentState, action);
        listeners.forEach((listener) => listener());
      },
      subscribe: (listener) => {
        listeners.push(listener);
        return () => {
          listeners = listeners.filter((l) => l !== listener);
        };
      },
    };
  }
  
  let myStore = initializeStore(reducer);
  
  // Initial state verification
  console.log('Initial State:', myStore.getState());
  
  // Subscribe to state changes and log the state
  myStore.subscribe(() => console.log('State after change:', myStore.getState()));
  
  // Dispatching actions to see the changes
  console.log('Dispatching ADD action');
  myStore.dispatch({ type: ADD }); // Adds 1
  
  console.log('Dispatching ADD action');
  myStore.dispatch({ type: ADD }); // Adds another 1
  
  console.log('Dispatching SUBTRACT action');
  myStore.dispatch({ type: SUBTRACT }); // Subtracts 1
  
  console.log('Dispatching RESET action');
  myStore.dispatch({ type: RESET }); // Resets to 0
  
  console.log('Dispatching ADD action');
  myStore.dispatch({ type: ADD }); // Adds 1 again
  