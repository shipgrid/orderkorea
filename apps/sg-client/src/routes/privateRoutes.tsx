import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const HomeContainer = lazy(() => import("../components/Dashboard/Containers/HomeContainer"));
const OrderContainer = lazy(() => import("../components/Dashboard/Containers/OrderContainer"));
const VehicleDetailContainer = lazy(() => import("../components/Dashboard/Containers/VehicleDetailContainer"));
const OrderDetailContainer = lazy(() => import("../components/Dashboard/Containers/OrderDetailContainer"));
const DeliveryDestinationContainer = lazy(() => import("../components/Dashboard/Containers/DeliveryDestinationContainer"));

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Dashboard />,
    children: [
      { path: '/', element: <HomeContainer /> },
      { path: '/vehicle', element: <VehicleDetailContainer /> },
      { path: '/order-detail', element: <OrderDetailContainer /> },
      { path: '/orders', element: <OrderContainer /> },
      { path: '/delivery-destination', element: <DeliveryDestinationContainer /> },
      { path: "*", element: <Navigate to="/login" replace /> },
    ],
  },
];

export default privateRoutes;
