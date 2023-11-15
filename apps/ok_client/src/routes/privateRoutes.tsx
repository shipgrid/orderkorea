import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const ProductDetails = lazy(() => import("../components/ProductDetails"));

const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Dashboard />,
    children: [
      { path: "/", element: <ProductDetails /> },
    ],  
  },
];

export default privateRoutes;
