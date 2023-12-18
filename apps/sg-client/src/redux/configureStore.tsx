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

import { setupListeners } from '@reduxjs/toolkit/query'

import { configureStore } from '@reduxjs/toolkit'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';

import session from './reducers/session'

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import localStorage from 'redux-persist/lib/storage' 

import {
  vehicleApi
} from '../hooks/useVehicles'

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
  [vehicleApi.reducerPath]: vehicleApi.reducer,
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
    vehicleApi.reducerPath
  ]
}

const rrfConfig = {}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
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
    }).concat(vehicleApi.middleware),
})

setupListeners(store.dispatch)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
}

export {
  store,
  rrfProps
}
