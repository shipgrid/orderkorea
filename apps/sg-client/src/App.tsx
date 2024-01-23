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

import { 
  ElfsightWidget 
} from 'react-elfsight-widget';

import Root from './Root'
import Loader from './components/Shared/Loader'
import AuthLoader from './components/Shared/AuthLoader'
import './index.css'
import './assets/global.css'

const App = () => {

  return (
    <div>
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
                <ElfsightWidget widgetId={'2604a269-db6d-453d-965b-5106f8a0df64'} lazy modern />
              </AuthLoader>
            </ReactReduxFirebaseProvider>
          </ConfigProvider>
        </PersistGate>
      </Provider>
    </div>
  )
}

export default App
