import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Private = () => {
    const token = cookies.get("TOKEN");

    if(!token) return <Navigate to='/login' replace />

    return <Outlet />
}
