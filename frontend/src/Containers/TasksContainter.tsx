import React from "react";
import DeliveriesContainer from '../Components/myTasks/DeliveriesContainer';
import './TasksContainer.css';
import FiltersContainer from "../Components/myTasks/FiltersContainer";
import { Box, Typography } from "@mui/material";

const TasksContainer = () => {
  return (
    <div className="tasks-container">
      <Typography sx={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 25, ml: 2, mb:1 }}>My Deliveries</Typography>
      <FiltersContainer />
      <DeliveriesContainer/>
    </div>
  );
};

export default TasksContainer;
