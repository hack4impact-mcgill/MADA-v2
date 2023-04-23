import React from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import {login} from 'src/api/auth';
import AxiosInstance from 'src/api/axios';

export const Private = () => {
    // const auth = useAuthStore((state: AuthState) => state.auth)

    // if(!auth) return <Navigate to='/login' replace />
    return <Navigate to='/login' replace />

    // return <Outlet />
}
