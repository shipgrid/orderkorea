import { Navigate } from "react-router-dom";
import Public from '../pages/Public';
import LoginForm from '../components/Dashboard/Forms/LoginForm';
import SignUpForm from "../components/Dashboard/Forms/SignUpForm";
import InventoryContainer from "../components/Dashboard/Containers/InventoryContainer";
import DashboardContainer from "../components/Dashboard";
import VehicleDetailContainer from "../components/Dashboard/Containers/VehicleDetailContainer";

export default function routes() {
  return [
    {
      path: '/',
      element: <Public />,
      children: [
        { path: '/', 
          element: <DashboardContainer/>,
          children: [
            { path: '/', element: <InventoryContainer /> },
            { path: '/vehicle', element: <VehicleDetailContainer /> },
          ]
        },
        { path: '/login', element: <LoginForm /> },
        { path: '/signup', element: <SignUpForm />},
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
  ];
}
