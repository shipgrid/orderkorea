
import React from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { configureStore } from "./redux/configureStore";
import PublicRoute from "./routes/publicRoutes";
import PrivateRoute from './routes/privateRoutes'

const App = () => {

  const store = configureStore();

  const router = createBrowserRouter([
    // checkAuth() ? PrivateRoute() : {},
    ...PrivateRoute,
    ...PublicRoute(),
  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App
