import { createStore, applyMiddleware, Store, Middleware } from 'redux'; // Import from Redux
import rootReducer, { RootState } from './reducers/index'; // Import your root reducer and RootState type
import { loadState, saveState } from '../utils/session'; // Import your session utility functions

import { createLogger } from 'redux-logger'; // Import from redux-logger
import throttle from 'lodash/throttle'; // Import from lodash

export const configureStore = (): Store<RootState> => {
  try {
    const middlewares: Middleware[] = [];

    const persistedState = loadState();
  
    if (process.env.NODE_ENV !== 'production') {
      middlewares.push(createLogger());
    }
  
    const store = createStore(
      rootReducer,
      persistedState,
      applyMiddleware(...middlewares)
    );
      
    store.subscribe(
      throttle(() => {
        saveState(store.getState());
      }, 1000)
    );
  
    return store;

  } catch(e) {
    console.error(e);
    throw e;
  }
};
