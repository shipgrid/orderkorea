import { Provider } from "react-redux";
import { configureStore } from "./redux/configureStore";
import configureAxios from "./utils/configureAxios";
import { ConfigProvider } from 'antd';
import Root from './Root'
import React from 'react';

const App = () => {

  const store = configureStore();
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
          <Root/>
        </ConfigProvider>
      </Provider>
    </>
  )
}

export default App
