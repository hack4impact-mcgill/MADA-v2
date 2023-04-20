import React from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import VolunteersPage from './components/volunteers/page';
import ClientsPage from './components/clients/page';
import TasksPage from './components/tasks/page';
import LoginPage from './components/auth/page';
import {AuthState, useAuthStore} from 'src/auth.store';

const PrivateRoutes = () => {
    const auth = useAuthStore((state: AuthState) => state.auth)

    if(!auth) return <Navigate to='/login' replace />

    return <Outlet />
}

const Router = () => {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage />}/>
            <Route element={<PrivateRoutes />}>
                <Route path="/*" element={<div>Admin</div>} />
                <Route path="/volunteers" element={<VolunteersPage/>} />
                <Route path="/clients" element={<ClientsPage/>} />
                <Route path="/tasks" element={<TasksPage/>} />
            </Route>
        </Routes>
    )
}

export default Router;

