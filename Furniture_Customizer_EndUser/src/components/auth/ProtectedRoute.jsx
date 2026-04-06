import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        // Redirect to login page
        const loginPath = allowedRoles?.length === 1 && allowedRoles[0] === 'vendor' ? '/vendor-login' : '/login';
        return <Navigate to={loginPath} state={{ from: location }} replace />;
    }

    const userRole = user?.role;

    // specific role checks
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default ProtectedRoute;
