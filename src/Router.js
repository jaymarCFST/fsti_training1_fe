import Login from "./pages/auth/login";
import { Navigate } from "react-router-dom";
import Dashboard from "./pages/auth/dashboard";
import Register from "./pages/auth/register";

const routes = () => [
    {
        path: '/',
        element: <><Navigate to="/login"/></>
    },
    {
        path: '/login',
        element: <><Login/></>
    },
    {
        path: '/register',
        element: <><Register/></>
    },
    {
        path: '/dashboard',
        element: <><Dashboard/></>
    }
];

export default routes;