import React from 'react'
import Reception from '../pages/Reception';
import Dashboard from '../pages/Dashboard';
import { Navigate } from 'react-router-dom';

function PrivateRoutes({ children, roleCompare}) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if(!token) {
        return (<Navigate to="/" />)
    }

    if(roleCompare, roleCompare.includes(role)) {
        return children
    }

    return <Navigate to="/reception" />
}

export default PrivateRoutes