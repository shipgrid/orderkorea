import { Provider } from "react-redux";
import configureAxios from "./utils/configureAxios";
import { ConfigProvider } from 'antd';
import Root from './Root'
import React from 'react';
import Loader from './components/Shared/Loader'

import {
  ReactReduxFirebaseProvider,
} from 'react-redux-firebase'

import { PersistGate } from 'redux-persist/integration/react'
import AuthLoader from './components/Shared/AuthLoader'

import {
  persistStore,
} from 'redux-persist'

import {
  store,
  rrfProps
} from './redux/configureStore'

const App = () => {
  configureAxios(store)
  
  type ThemeData = {
    borderRadius: number;
    colorPrimary: string;
    Button?: {
      colorPrimary: string;
      algorithm?: boolean;
    };
  };

  const defaultData: ThemeData = {
    borderRadius: 6,
    colorPrimary: '#1677ff',
    Button: {
      colorPrimary: '#BACC81',
    },
  };

  const [data, setData] = React.useState<ThemeData>(defaultData);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<Loader/>} persistor={persistStore(store)}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: data.colorPrimary,
                borderRadius: data.borderRadius,
              },
              components: {
                Menu: {
                  colorPrimary: data.colorPrimary,
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
