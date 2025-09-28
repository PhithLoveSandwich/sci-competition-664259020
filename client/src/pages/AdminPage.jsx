import { Navigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";

const AdminPage = ({ children }) => {
    const { user } = useAuthContext();

    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    if (user.type !== "admin") {
        return <Navigate to="/notallowed" replace />;
    }

    return children;
};

export default AdminPage;
