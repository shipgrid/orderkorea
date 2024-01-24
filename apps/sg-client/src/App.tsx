import { 
  Provider 
} from "react-redux";

import { 
  ConfigProvider 
} from 'antd';

import { 
  PersistGate 
} from 'redux-persist/integration/react'

import {
  persistStore,
} from 'redux-persist'

import {
  store,
} from './redux/configureStore'

import {
  ThemeData
} from './theme'

import Root from './Root'
import Loader from './components/Shared/Loader'
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
            <Root/>
          </ConfigProvider>
        </PersistGate>
      </Provider>
    </div>
  )
}

export default App
