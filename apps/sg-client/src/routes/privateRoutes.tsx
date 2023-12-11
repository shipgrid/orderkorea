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
      { path: '/vehicle-detail', element: <VehicleDetailContainer /> },
      { path: '/order-detail', element: <OrderDetailContainer /> },
      // { path: '/inventory', element: <InventoryContainer /> },
      // { path: '/create-shipment', element: <SOMContainer /> },
      { path: '/orders', element: <OrderContainer /> },
      // { path: '/shipments', element: <ShipmentContainer /> },
      { path: '/delivery-destination', element: <DeliveryDestinationContainer /> },
      // { path: '/inform-order', element: <InformOrderContainer /> },
      // { path: '/billing', element: <BillingContainer /> },
      // { path: '/shipping-calculator', element: <ShippingCalculatorContainer /> },
      { path: "*", element: <Navigate to="/login" replace /> },
    ],
  },
];

export default privateRoutes;
