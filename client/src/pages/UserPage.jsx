import { Navigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";

const UserPage = ({ children }) => {
    const { user } = useAuthContext();

    // ถ้ายังไม่ล็อกอิน ให้ไปหน้า signin
    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    // ถ้าล็อกอินแล้ว ให้แสดง children
    return children;
};

export default UserPage;
