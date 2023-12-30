
import { 
  createBrowserRouter, 
  RouterProvider 
} from "react-router-dom";

import { 
  useSelector 
} from 'react-redux'

import { 
  useState, 
  useEffect 
} from "react";

import { 
  isLoaded 
} from 'react-redux-firebase'

import PublicRoute from "./routes/publicRoutes";
import PrivateRoute from './routes/privateRoutes'
import Loader from './components/Shared/Loader'

const App = () => {

  const auth = useSelector((state: any) => state.firebase.auth)
  const session = useSelector((state: any) => state.session)

  const [routes, setRoutes] = useState<any>(null);

  const privateRoutes = !!auth && !!session.token ? [...PrivateRoute()] : []

  const allRoutes = ([
    ...privateRoutes,
    ...PublicRoute(),
  ]);

  useEffect(() => {
    if(isLoaded(auth)) {
      const createdRoutes = createBrowserRouter(allRoutes);
      setRoutes(createdRoutes);
    }
  }, [auth, session.token]);

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