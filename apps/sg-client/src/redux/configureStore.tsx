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
  configureStore 
} from '@reduxjs/toolkit'

import {
  api
} from '../services/api'

import session from './reducers/session'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import localStorage from 'redux-persist/lib/storage' 

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYLoJUVGHCybEjP-aK5nhfQ5Jjfs5wwHY",
  authDomain: "shipgrid-new-staging.firebaseapp.com",
  projectId: "shipgrid-new-staging",
  storageBucket: "shipgrid-new-staging.appspot.com",  
  messagingSenderId: "98969594634",
  appId: "1:98969594634:web:79fb66995b1c41cd9768f3",
  measurementId: "G-FDBDMXFFHB"
};

firebase.initializeApp(firebaseConfig)

const rootReducer: Reducer = combineReducers({
  [api.reducerPath]: api.reducer,
  session,
  firebase: persistReducer(
    { key: 'firebaseState', storage: localStorage, stateReconciler: autoMergeLevel2 },
    firebaseReducer
  ),
});

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
