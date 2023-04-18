import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import VolunteerPage from './components/volunteers/volunteers-page';

const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Admin</div>} />
        <Route path="/volunteers" element={<VolunteerPage/>} />
      </Routes>
    </BrowserRouter>
  );
};
export default RouterComponent;

