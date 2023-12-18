
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicRoute from "./routes/publicRoutes";
import PrivateRoute from './routes/privateRoutes'
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import Loader from './components/Shared/Loader'
import { isLoaded } from 'react-redux-firebase'

const App = () => {

  const auth = useSelector((state: any) => state.firebase.auth)
  const [routes, setRoutes] = useState<any>(null);

  const privateRoutes = !!auth && !!auth.uid ? [...PrivateRoute()] : []

  const allRoutes = ([
    ...privateRoutes,
    ...PublicRoute(),
  ]);

  useEffect(() => {
    if (isLoaded(auth)) {
      const createdRoutes = createBrowserRouter(allRoutes);
      setRoutes(createdRoutes);
    }
  }, [auth]);

  return (
    <>
    {
      routes ? (
        <RouterProvider 
          router={routes} 
          fallbackElement={<Loader />}
        />
      ) : <Loader />
    }
    </>
  )
}


export default App;