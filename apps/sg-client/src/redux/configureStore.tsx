import { 
  createStore, 
  applyMiddleware, 
  Store, 
  Middleware 
} from 'redux'; 

import rootReducer, { 
  RootState 
} from './reducers/index'; 

import { 
  loadState, 
  saveState 
} from '../utils/session'; 

import { 
  createLogger 
} from 'redux-logger'; 

import throttle from 'lodash/throttle'; 

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
    throw e;
  }
};
