import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import { 
  combineReducers, 
  Reducer 
}  from "redux";

import { 
  setupListeners 
} from '@reduxjs/toolkit/query'

import { 
  configureStore,
  createSlice
} from '@reduxjs/toolkit'

import {
  api
} from '../services/api'

import session from './reducers/session'
import order from './reducers/order'
import localStorage from 'redux-persist/lib/storage' 

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig)

const logoutSlice = createSlice({
  name: 'logout',
  initialState: {},
  reducers: {
    logout: (state) => {
      console.log(state)
      localStorage.removeItem('persist:root');
      state = {};
    },
  },
});

export const { logout } = logoutSlice.actions;

const appReducer: Reducer = combineReducers({
  [api.reducerPath]: api.reducer,
  session,
  order,
  logout: logoutSlice.reducer,
});

const rootReducer: Reducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.removeItem('persist:root')
    state = undefined
  }

  return appReducer(state, action)
}

const persistConfig = {
  key: 'root',
  version: 1,
  timeout: 1000,
  storage: localStorage,
  blacklist: [
    api.reducerPath,
  ]
}

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
        ],
      },
    })
    .concat(api.middleware)
})

setupListeners(store.dispatch)

export {
  store,
}
