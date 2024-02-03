import { Navigate } from "react-router-dom";
import Public from '../pages/Public';
import LoginForm from '../components/Dashboard/Forms/LoginForm';
import SignUpForm from "../components/Dashboard/Forms/SignUpForm";

export default function routes() {
  return [
    {
      path: '/',
      element: <Public />,
      children: [
        { path: '/', element: <LoginForm /> },
        { path: '/signup', element: <SignUpForm />},
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
  ];
}
