import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import AvailabilitiesContainer from "./Containers/AvailabilitiesContainer";
import HistoryContainer from "./Containers/HistoryContainer";
import LoginContainer from "./Containers/LoginContainer";
import TasksContainer from "./Containers/TasksContainter";
import TodayContainer from "./Containers/TodayContainer";
import UserProfileContainer from "./Containers/UserProfileContainer";
import NavBar from "./Components/NavBar/NavBar";
import ForgotPasswordContainer from "./Containers/ForgotPasswordContainer";

const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/today" element={<TodayContainer />} />
        <Route path="/" element={<LoginContainer />} />
        <Route path="/password" element={<ForgotPasswordContainer />} />
        <Route path="/profile" element={<UserProfileContainer />} />
        <Route path="/history" element={<HistoryContainer />} />
        <Route path="/tasks" element={<TasksContainer />} />
        <Route path="/availabilities" element={<AvailabilitiesContainer />} />
      </Routes>
    </BrowserRouter>
  );
};
export default RouterComponent;

