// src/components/ProtectedRoute.tsx
import React from 'react';
import { RouteProps, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface ProtectedRouteProps extends RouteProps {
    component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to home page if not authenticated
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <Component {...rest} />;
};

export default ProtectedRoute;
