import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import VolunteersPage from './components/volunteers/page';
import ClientsPage from './components/clients/page';
import TasksPage from './components/tasks/page';

const RouterComponent = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<div>Admin</div>} />
            <Route path="/volunteers" element={<VolunteersPage/>} />
            <Route path="/clients" element={<ClientsPage/>} />
            <Route path="/tasks" element={<TasksPage/>} />
        </Routes>
    </BrowserRouter>
  );
};
export default RouterComponent;

