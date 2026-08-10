import { Navigate } from "react-router-dom";


function ProtectedRoute({ children, adminOnly = false }) {


    const isLoggedIn = localStorage.getItem("isLoggedIn");

    const role = localStorage.getItem("role");



    // Login nahi hai
    if (!isLoggedIn) {

        return <Navigate to="/" />;

    }



    // Admin page hai aur user admin nahi hai
    if (adminOnly && role !== "admin") {

        return <Navigate to="/dashboard" />;

    }



    return children;

}


export default ProtectedRoute;
