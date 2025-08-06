// components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("token");
    console.log("isAuthenticated", isAuthenticated ? "true" : "false");
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
