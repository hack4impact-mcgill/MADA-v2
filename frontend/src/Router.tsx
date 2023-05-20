import React, {useEffect} from "react";
import {Box} from "@mui/material"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AvailabilitiesContainer from "./Containers/AvailabilitiesContainer";
import HistoryContainer from "./Containers/HistoryContainer";
import LoginContainer from "./Containers/LoginContainer";
import TasksContainer from "./Containers/TasksContainter";
import TodayContainer from "./Containers/TodayContainer";
import UserProfileContainer from "./Containers/UserProfileContainer";
import ForgotPasswordContainer from "./Containers/ForgotPasswordContainer";
import {Private} from "./Components/LogIn/Main/Private"
import Cookies from "universal-cookie";

const cookies = new Cookies();

const RedirectPath = () => {
  const navigate = useNavigate();
  const token = cookies.get("TOKEN");

  useEffect(() => {
      if (token) {
        // TO DO figure out what page to redirect to 
          navigate('/today') 
      } else {
          navigate('/');
      }
  }, []);

  return (<>
      <Box>Redirecting...</Box>
  </>)
}

const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginContainer />} />
        <Route element={<Private />}>
          <Route path="*" element={<RedirectPath />} />
          <Route path="/today" element={<TodayContainer />} />
          <Route path="/password" element={<ForgotPasswordContainer />} />
          <Route path="/profile" element={<UserProfileContainer />} />
          <Route path="/history" element={<HistoryContainer />} />
          <Route path="/tasks" element={<TasksContainer />} />
          <Route path="/availabilities" element={<AvailabilitiesContainer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RouterComponent;
