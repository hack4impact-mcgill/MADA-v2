import React from "react";
import DeliveriesContainer from '../Components/myTasks/DeliveriesContainer';
import './TasksContainer.css';
import FiltersContainer from "../Components/myTasks/FiltersContainer";
import TopRectangle from "../Components/myTasks/AvailabilitiesCheckIn/TopRectangle";
import AvailabilitiesCheckIn from "../Components/myTasks/AvailabilitiesCheckIn/AvailabilitiesCheckIn";
import CheckInButton from "../Components/myTasks/AvailabilitiesCheckIn/CheckInButton";
import { TaskProvider } from "../contexts/Tasks";
import { Box, Typography } from "@mui/material";

const TasksContainer = () => {
  return (
    <div className="tasks-container">
      {/* enable accessing Task Context */}
      <TaskProvider> 
        <TopRectangle />
        <AvailabilitiesCheckIn />
        <CheckInButton />
        <Typography sx={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 25, ml: 2, mb:1 }}>My Deliveries</Typography>
        <FiltersContainer />
        <DeliveriesContainer/>
      </TaskProvider>
    </div>
  );
};

export default TasksContainer;
