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
  getFirebase,
  firebaseReducer,
  actionTypes as rrfActionTypes,
} from 'react-redux-firebase'

import { 
  combineReducers, 
  Reducer 
}  from "redux";

import { 
  setupListeners 
} from '@reduxjs/toolkit/query'

import { 
  configureStore,
} from '@reduxjs/toolkit'

import {
  api
} from '../services/api'

import session from './reducers/session'
import order from './reducers/order'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import localStorage from 'redux-persist/lib/storage' 

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQID1UbncdIY0aSDx9yE6VoDrTRHU2oHk",
  authDomain: "shipgrid-6574f.firebaseapp.com",
  projectId: "shipgrid-6574f",
  storageBucket: "shipgrid-6574f.appspot.com",
  messagingSenderId: "606903637852",
  appId: "1:606903637852:web:709a5f908d1a1f50e25399",
  measurementId: "G-DYNMVTF43D"
};

firebase.initializeApp(firebaseConfig)

const appReducer: Reducer = combineReducers({
  [api.reducerPath]: api.reducer,
  session,
  order,
  firebase: persistReducer(
    { key: 'firebaseState', storage: localStorage, stateReconciler: autoMergeLevel2 },
    firebaseReducer
  ),
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
    'firebase',
    'firebaseState',
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
          ...Object.keys(rrfActionTypes).map(
            (type) => `@@reactReduxFirebase/${type}`
          ),
        ],
        ignoredPaths: ['firebase', 'firestore'],
      },
      thunk: {
        extraArgument: {
          getFirebase,
        },
      },
    })
    .concat(api.middleware)
})

setupListeners(store.dispatch)

const rrfConfig = {}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
}

export {
  store,
  rrfProps
}
