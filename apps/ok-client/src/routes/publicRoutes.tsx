import { Navigate } from "react-router-dom";
import Login from '../pages/Login';
import LoginForm from '../components/Public/Login/LoginForm';

export default function routes() {
  return [
    {
      path: '/',
      element: <Login />,
      children: [
        { path: '/', element: <LoginForm /> },
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
  ];
}
