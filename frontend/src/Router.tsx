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
import UserContainer from "./Containers/UserContainer";
import DeliveryDetails from "./Components/DeliveryDetails/DeliveryDetails";
import { TaskInterface } from "./Contexts/Tasks";
import { DateProvider } from "./Contexts/Date";

const RouterComponent = () => {
  return (
    <BrowserRouter>
      <DateProvider>
        <Routes>
          <Route path="/today" element={<TodayContainer />} />
          <Route path="/" element={<LoginContainer />} />
          <Route path="/password" element={<ForgotPasswordContainer />} />
          <Route
            path="/volunteers/:id/edit"
            element={<UserProfileContainer />}
          />
          <Route path="/volunteers/:id" element={<UserContainer />} />
          <Route path="/history" element={<HistoryContainer />} />
          <Route path="/tasks" element={<TasksContainer />} />
          <Route path="/availabilities" element={<AvailabilitiesContainer />} />
          <Route
            path="/delivery-details"
            element={<DeliveryDetails delivery={null} />}
          />
        </Routes>
      </DateProvider>
    </BrowserRouter>
  );
};
export default RouterComponent;
