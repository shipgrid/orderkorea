import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

// const ProductDetails = lazy(() => import("../components/ProductDetails"));
const InventoryContainer = lazy(() => import("../components/Dashboard/Containers/InventoryContainer"));

const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Dashboard />,
    children: [
      { path: "/", element: <InventoryContainer /> },
    ],  
  },
];

export default privateRoutes;
