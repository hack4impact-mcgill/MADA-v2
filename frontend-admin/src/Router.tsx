import React from "react";
import { Route, Routes} from "react-router-dom";
import VolunteersPage from './components/volunteers/page';
import ClientsPage from './components/clients/page';
import TasksPage from './components/tasks/page';
import LoginPage from './components/auth/page';
import {Private} from './components/auth/private';

const Router = () => {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage />}/>
            <Route element={<Private />}>
                <Route path="/volunteers" element={<VolunteersPage/>} />
                <Route path="/clients" element={<ClientsPage/>} />
                <Route path="/tasks" element={<TasksPage/>} />
            </Route>
        </Routes>
    )
}

export default Router;

