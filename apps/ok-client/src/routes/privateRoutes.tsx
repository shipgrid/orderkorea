import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const HomeContainer = lazy(() => import("../components/Dashboard/Containers/HomeContainer"));
const InventoryContainer = lazy(() => import("../components/Dashboard/Containers/InventoryContainer"));
const OrderContainer = lazy(() => import("../components/Dashboard/Containers/OrderContainer"));
const ShipmentContainer = lazy(() => import("../components/Dashboard/Containers/ShipmentContainer"));
const BillingContainer = lazy(() => import("../components/Dashboard/Containers/BillingContainer"));
const PurchaseOrderContainer = lazy(() => import("../components/Dashboard/Containers/PurchaseOrderContainer"));
const InformOrderContainer = lazy(() => import("../components/Dashboard/Containers/InformOrderContainer"));
const ShippingCalculatorContainer = lazy(() => import("../components/Dashboard/Containers/ShippingCalculatorContainer"));
const SOMContainer = lazy(() => import("../components/Dashboard/Containers/SOMContainer"));
const CheckoutContainer = lazy(() => import('../components/Dashboard/Containers/CheckoutContainer'))

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Dashboard />,
    children: [
      { path: '/', element: <HomeContainer /> },
      { path: '/inventory', element: <InventoryContainer /> },
      { path: '/create-shipment', element: <SOMContainer /> },
      { path: '/orders', element: <OrderContainer /> },
      { path: '/shipments', element: <ShipmentContainer /> },
      { path: '/purchase-order', element: <PurchaseOrderContainer /> },
      { path: '/inform-order', element: <InformOrderContainer /> },
      { path: '/billing', element: <BillingContainer /> },
      { path: '/shipping-calculator', element: <ShippingCalculatorContainer /> },
      { path: '/checkout', element: <CheckoutContainer/> },
      { path: "*", element: <Navigate to="/login" replace /> },
    ],
  },
];

export default privateRoutes;
