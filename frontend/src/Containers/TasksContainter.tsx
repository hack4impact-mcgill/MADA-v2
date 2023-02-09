import React from "react";
import Deliveries from '../Components/myTasks/Deliveries';
import './TasksContainer.css';
import FiltersContainer from "../Components/myTasks/FiltersContainer";
import { Box, Typography } from "@mui/material";

const TasksContainer = () => {
  return (
    <div className="tasks-container">
      Hello this is the tasks page
      <Typography sx={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 25, ml: 2, mb:1 }}>My Deliveries</Typography>
      <FiltersContainer />
      <Deliveries/>
    </div>
  );
};

export default TasksContainer;
