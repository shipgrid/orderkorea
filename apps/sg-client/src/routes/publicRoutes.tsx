import { Navigate } from "react-router-dom";
import Login from '../pages/Login';
import LoginForm from '../components/Public/Login/LoginForm';
import SignUpForm from "../components/Public/Login/SignUpForm";

export default function routes() {
  return [
    {
      path: '/',
      element: <Login />,
      children: [
        { path: '/', element: <LoginForm /> },
        { path: '/signup', element: <SignUpForm />},
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
  ];
}
