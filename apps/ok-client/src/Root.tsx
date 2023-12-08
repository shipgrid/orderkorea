
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicRoute from "./routes/publicRoutes";
import PrivateRoute from './routes/privateRoutes'

import { 
  connect 
} from 'react-redux';

const App = ({
  isAuth
}: any) => {

  const routes = isAuth ? [
    ...PrivateRoute,
    ...PublicRoute()
  ] : [
    {},
    ...PublicRoute()
  ]

  const router = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

const mapStateToProps = (state:any) => {
  return {
    isAuth: state.session.isAuth, // Replace with your actual authentication state property
  };
};

export default connect(mapStateToProps)(App);