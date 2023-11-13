import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";

const Dashboard = lazy(() => import("../components/ProductDetails"));

const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
    ],  
  },
];

export default privateRoutes;
