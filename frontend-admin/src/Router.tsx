import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import VolunteersPage from './components/volunteers/volunteers-page';
import ClientsPage from './components/clients/clients-page';
import TasksPage from './components/tasks/tasks-page';
// import PersistentDrawerLeft from './components/common/drawer';

const RouterComponent = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<div>Admin</div>} />
            <Route path="/volunteers" element={<VolunteersPage/>} />
            <Route path="/clients" element={<ClientsPage/>} />
            <Route path="/tasks" element={<TasksPage/>} />
            <Route path="/empty" element={<div style={{backgroundColor: 'red', height: '100%', width: '100%'}}>red</div>} />
        </Routes>
    </BrowserRouter>
  );
};
export default RouterComponent;

