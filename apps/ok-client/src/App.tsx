import { Provider } from "react-redux";
import { configureStore } from "./redux/configureStore";
import configureAxios from "./utils/configureAxios";

import Root from './Root'

const App = () => {

  const store = configureStore();
  configureAxios(store)

  return (
    <>
      <Provider store={store}>
        <Root/>
      </Provider>
    </>
  )
}

export default App
