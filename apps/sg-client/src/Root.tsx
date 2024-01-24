
import { 
  createHashRouter,
  RouterProvider 
} from "react-router-dom";

import { 
  useSelector 
} from 'react-redux'

import { 
  useState, 
  useEffect 
} from "react";

import PublicRoute from "./routes/publicRoutes";
import PrivateRoute from './routes/privateRoutes'
import Loader from './components/Shared/Loader'

const App = () => {

  const auth = useSelector((state: any) => state.session.isAuth)
  const session = useSelector((state: any) => state.session)

  const [routes, setRoutes] = useState<any>(null);

  const privateRoutes = !!auth && !!session.token ? [...PrivateRoute()] : []

  const allRoutes = ([
    ...privateRoutes,
    ...PublicRoute(),
  ]);

  useEffect(() => {
    const createdRoutes = createHashRouter(allRoutes);
    setRoutes(createdRoutes);

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