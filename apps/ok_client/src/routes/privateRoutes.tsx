import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

// const ProductDetails = lazy(() => import("../components/ProductDetails"));
const SOMContainer = lazy(() => import("../components/Dashboard/Containers/SOMContainer"));

const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Dashboard />,
    children: [
      // { path: "/", element: <InventoryContainer /> },
      { path: '/create-shipment', element: <SOMContainer />}
    ],  
  },
];

export default privateRoutes;
