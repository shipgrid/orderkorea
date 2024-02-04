import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

import HomeContainer from "../components/Dashboard/Containers/HomeContainer";
import OrderContainer from "../components/Dashboard/Containers/OrderContainer";
import VehicleDetailContainer from "../components/Dashboard/Containers/VehicleDetailContainer";
import OrderDetailContainer from "../components/Dashboard/Containers/OrderDetailContainer";
import OrderDetailFormContainer from "../components/Dashboard/Containers/OrderDetailFormContainer";
import ThirdPartyContainer from "../components/Dashboard/Containers/ThirdPartyContainer";
import UploadVehicleFormContainer from "../components/Dashboard/Containers/UploadVehicleFormContainer";
import CreateOrderFormContainer from "../components/Dashboard/Containers/CreateOrderFormContainer";
import InventoryContainer from "../components/Dashboard/Containers/InventoryContainer";
import AdminContainer from "../components/Dashboard/Containers/AdminContainer";
import CheckoutContainer from "../components/Dashboard/Containers/CheckoutContainer";
import SellerContactedContainer from "../components/Dashboard/Containers/SellerContactedContainer";
import MyInventoryContainer from '../components/Dashboard/Containers/MyInventoryContainer';
import AccountContainer from "../components/Dashboard/Containers/AccountContainer";

export default function routes() {
  return [
    {
      path: '/',
      element: <Dashboard />,
      children: [
        { path: '/', element: <HomeContainer /> },
        { path: '/inventory', element: <MyInventoryContainer /> },
        { path: '/broker-inventory', element: <InventoryContainer /> },
        { path: '/vehicle', element: <VehicleDetailContainer /> },
        { path: '/order', element: <OrderDetailContainer /> },
        { path: '/admin', element: <AdminContainer />},
        { path: '/order-detail', element: <OrderDetailFormContainer /> },
        { path: '/upload-vehicle', element: <UploadVehicleFormContainer /> },
        { path: '/create-order', element: <CreateOrderFormContainer /> },
        { path: '/orders', element: <OrderContainer /> },
        { path: '/third-party', element: <ThirdPartyContainer /> },
        { path: '/checkout', element: <CheckoutContainer /> },
        { path: '/account', element: <AccountContainer /> },
        { path: '/return', element: <SellerContactedContainer />},
        { path: "*", element: <Navigate to="/login" replace /> },
      ],
    }
  ]
}
