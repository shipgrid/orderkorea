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
import ApiLoader from "./components/Shared/ApiLoader";
import './index.css'
import './assets/global.css'

const App = () => {

  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={<ApiLoader/>} persistor={persistStore(store)}>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: 'Roboto',
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
