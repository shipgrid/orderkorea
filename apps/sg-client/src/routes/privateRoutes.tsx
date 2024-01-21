import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const OrderContainer = lazy(() => import("../components/Dashboard/Containers/OrderContainer"));
const VehicleDetailContainer = lazy(() => import("../components/Dashboard/Containers/VehicleDetailContainer"));
const OrderDetailContainer = lazy(() => import("../components/Dashboard/Containers/OrderDetailContainer"));
const OrderDetailFormContainer = lazy(() => import("../components/Dashboard/Containers/OrderDetailFormContainer"));
const ThirdPartyContainer = lazy(() => import("../components/Dashboard/Containers/ThirdPartyContainer"));
const UploadVehicleFormContainer = lazy(() => import("../components/Dashboard/Containers/UploadVehicleFormContainer"));
const CreateOrderFormContainer = lazy(() => import("../components/Dashboard/Containers/CreateOrderFormContainer"));
const InventoryContainer = lazy(() => import("../components/Dashboard/Containers/InventoryContainer"));
const AdminContainer = lazy(() => import("../components/Dashboard/Containers/AdminContainer"));
const CheckoutContainer = lazy(() => import("../components/Dashboard/Containers/CheckoutContainer"))

export default function routes() {
  return [
    {
      path: '/',
      element: <Dashboard />,
      children: [
        { path: '/', element: <InventoryContainer /> },
        { path: '/vehicle', element: <VehicleDetailContainer /> },
        { path: '/order', element: <OrderDetailContainer /> },
        { path: '/admin', element: <AdminContainer />},
        { path: '/order-detail', element: <OrderDetailFormContainer /> },
        { path: '/upload-vehicle', element: <UploadVehicleFormContainer /> },
        { path: '/create-order', element: <CreateOrderFormContainer /> },
        { path: '/inventory', element: <InventoryContainer /> },
        { path: '/orders', element: <OrderContainer /> },
        { path: '/third-party', element: <ThirdPartyContainer /> },
        { path: '/checkout', element: <CheckoutContainer /> },
        { path: "*", element: <Navigate to="/login" replace /> },
      ],
    }
  ]
}
