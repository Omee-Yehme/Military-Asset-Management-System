import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function ProtectedRoute({ children, roles }) {
    const { user } = useContext(AuthContext);

    if (!user) return <Navigate to="/" />;

    if (!roles.includes(user.role)) return <Navigate to="/unauthorized" />;

    return children;
}
