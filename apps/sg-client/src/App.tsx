import { 
  Provider 
} from "react-redux";

import { 
  ConfigProvider 
} from 'antd';

import {
  ReactReduxFirebaseProvider,
} from 'react-redux-firebase'

import { 
  PersistGate 
} from 'redux-persist/integration/react'

import {
  persistStore,
} from 'redux-persist'

import {
  store,
  rrfProps
} from './redux/configureStore'

import {
  ThemeData
} from './theme'

import Root from './Root'
import Loader from './components/Shared/Loader'
import AuthLoader from './components/Shared/AuthLoader'

const App = () => {

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<Loader/>} persistor={persistStore(store)}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: ThemeData.colorPrimary,
                borderRadius: ThemeData.borderRadius,
              },
              components: {
                Menu: {
                  colorPrimary: ThemeData.colorPrimary,
                  darkItemBg: '#013A2',
                },
              },
            }}
          >
            <ReactReduxFirebaseProvider {...rrfProps}>
              <AuthLoader>
                <Root/>
              </AuthLoader>
            </ReactReduxFirebaseProvider>
          </ConfigProvider>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
