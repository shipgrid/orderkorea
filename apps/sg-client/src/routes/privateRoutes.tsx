import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const HomeContainer = lazy(() => import("../components/Dashboard/Containers/HomeContainer"));
const OrderContainer = lazy(() => import("../components/Dashboard/Containers/OrderContainer"));
const VehicleDetailContainer = lazy(() => import("../components/Dashboard/Containers/VehicleDetailContainer"));
const OrderDetailContainer = lazy(() => import("../components/Dashboard/Containers/OrderDetailContainer"));
const OrderDetailFormContainer = lazy(() => import("../components/Dashboard/Containers/OrderDetailFormContainer"));
const ThirdPartyContainer = lazy(() => import("../components/Dashboard/Containers/ThirdPartyContainer"));

export default function routes() {
  return [
    {
      path: '/',
      element: <Dashboard />,
      children: [
        { path: '/', element: <HomeContainer /> },
        { path: '/vehicle', element: <VehicleDetailContainer /> },
        { path: '/order', element: <OrderDetailContainer /> },
        { path: '/order-detail', element: <OrderDetailFormContainer /> },
        { path: '/orders', element: <OrderContainer /> },
        { path: '/third-party', element: <ThirdPartyContainer /> },
        { path: "*", element: <Navigate to="/login" replace /> },
      ],
    }
  ]
}
