import React from 'react'
import Reception from '../pages/Reception';
import Dashboard from '../pages/DashBoard';
import { Navigate } from 'react-router-dom';

function PrivateRoutes({ children, roleCompare}) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if(!token) {
        return (<Navigate to="/" />)
    }

    if(roleCompare, roleCompare.includes(role)) {
        return (<Navigate to="/reception" />)
    }

    return children
}

export default PrivateRoutes