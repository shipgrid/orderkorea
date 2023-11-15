import { Navigate } from "react-router-dom";
import Login from '../pages/Login';

export default function routes() {
  return [
    { path: "/login", element: <Login /> },
    { path: "*", element: <Navigate to="/login" replace /> },
  ];
}