import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const InventoryContainer = lazy(() => import("../components/Dashboard/Containers/InventoryContainer"));
const OrderContainer = lazy(() => import("../components/Dashboard/Containers/OrderContainer"));
const ShipmentContainer = lazy(() => import("../components/Dashboard/Containers/ShipmentContainer"));
const BillingContainer = lazy(() => import("../components/Dashboard/Containers/BillingContainer"));
const SOMContainer = lazy(() => import("../components/Dashboard/Containers/SOMContainer"));

const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Dashboard />,
    children: [
      { path: "/inventory", element: <InventoryContainer /> },
      { path: '/create-shipment', element: <SOMContainer />},
      { path: '/orders', element: <OrderContainer />},
      { path: '/shipments', element: <ShipmentContainer />},
      { path: '/billing', element: <BillingContainer />}
    ],  
  },
];

export default privateRoutes;
