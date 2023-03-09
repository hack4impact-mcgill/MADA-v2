import React from "react";
import DeliveriesContainer from "../Components/myTasks/DeliveriesContainer";
import FiltersContainer from "../Components/myTasks/FiltersContainer";
import TopRectangle from "../Components/myTasks/AvailabilitiesCheckIn/TopRectangle";
import AvailabilitiesCheckIn from "../Components/myTasks/AvailabilitiesCheckIn/AvailabilitiesCheckIn";
import CheckInButton from "../Components/myTasks/AvailabilitiesCheckIn/CheckInButton";
import HistoryButtonContainer from "../Components/myTasks/HistoryButton/HistoryButtonContainer";
import { TaskProvider } from "../contexts/Tasks";
import { Typography } from "@mui/material";
import { useState } from "react";

const TasksContainer = () => {
  // dateFilter state will be used to filter tasks. Current date is used to initialize.
  // dateFilter state will be passed down to DeliviesContainer.
  // NOTE that dataFilter is in STRING type and not DATE type.
  const [dateFilter, setDateFilter] = useState(new Date().toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }));

  // this function will be passed down using props
  const dateFilterUpdateHandler = (date: string) => {
    setDateFilter(date); // update dateFilter
    console.log("dateFilter updated!", date);
  }

  return (
    <div className="tasks-container">
      {/* enable accessing Task Context by using TaskProvider */}
      <TaskProvider>
        <TopRectangle />
        <AvailabilitiesCheckIn />
        <CheckInButton />
        <HistoryButtonContainer />
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: 600,
            fontSize: 25,
            ml: "22px",
            mb: 1,
          }}
        >
          My Deliveries
        </Typography>
        <FiltersContainer updateDateFilter={dateFilterUpdateHandler} />
        <DeliveriesContainer dateFilter={dateFilter} />
      </TaskProvider>
    </div>
  );
};

export default TasksContainer;
