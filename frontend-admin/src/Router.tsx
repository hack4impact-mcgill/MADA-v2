import React, {useEffect} from "react";
import {Box} from '@mui/material';
import { Route, Routes, useNavigate } from "react-router-dom";
import VolunteersPage from './components/volunteers/page';
import ClientsPage from './components/clients/page';
import TasksPage from './components/tasks/page';
import LoginPage from './components/auth/page';
import {Private} from './components/auth/private';

import Cookies from "universal-cookie";
const cookies = new Cookies();

const RedirectPath = () => {
    const navigate = useNavigate();
    const token = cookies.get("TOKEN");

    useEffect(() => {
        if (token) {
            navigate('/volunteers')
        } else {
            navigate('/login');
        }
    }, []);

    return (<>
        <Box>Redirecting...</Box>
    </>)
}

const Router = () => {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage />}/>
            <Route element={<Private />}>
                <Route path="*" element={<RedirectPath/>} />
                <Route path="/volunteers" element={<VolunteersPage/>} />
                <Route path="/clients" element={<ClientsPage/>} />
                <Route path="/tasks" element={<TasksPage/>} />
            </Route>
        </Routes>
    )
}

export default Router;

