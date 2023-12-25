import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const HomeContainer = lazy(() => import("../components/Dashboard/Containers/HomeContainer"));
const OrderContainer = lazy(() => import("../components/Dashboard/Containers/OrderContainer"));
const VehicleDetailContainer = lazy(() => import("../components/Dashboard/Containers/VehicleDetailContainer"));
const OrderDetailContainer = lazy(() => import("../components/Dashboard/Containers/OrderDetailContainer"));
const DeliveryDestinationContainer = lazy(() => import("../components/Dashboard/Containers/DeliveryDestinationContainer"));
const NotifyPartyContainer = lazy(() => import("../components/Dashboard/Containers/NotifyPartyContainer"));

export default function routes() {
  return [
    {
      path: '/',
      element: <Dashboard />,
      children: [
        { path: '/', element: <HomeContainer /> },
        { path: '/vehicle', element: <VehicleDetailContainer /> },
        { path: '/order', element: <OrderDetailContainer /> },
        { path: '/orders', element: <OrderContainer /> },
        { path: '/delivery-destination', element: <DeliveryDestinationContainer /> },
        { path: '/notify-party', element: <NotifyPartyContainer /> },
        { path: "*", element: <Navigate to="/login" replace /> },
      ],
    }
  ]
}
