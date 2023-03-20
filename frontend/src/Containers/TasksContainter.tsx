import React from "react";
import DeliveriesContainer from "../Components/MyTasks/DeliveriesContainer";
import FiltersContainer from "../Components/MyTasks/FiltersContainer";
import TopRectangle from "../Components/MyTasks/AvailabilitiesCheckIn/TopRectangle";
import AvailabilitiesCheckIn from "../Components/MyTasks/AvailabilitiesCheckIn/AvailabilitiesCheckIn";
import CheckInButton from "../Components/MyTasks/AvailabilitiesCheckIn/CheckInButton";
import HistoryButtonContainer from "../Components/MyTasks/HistoryButton/HistoryButtonContainer";
import { TaskProvider } from "../Contexts/Tasks";
import { Typography } from "@mui/material";
import { useState } from "react";

const TasksContainer = () => {
  // dateFilter and completionFilter state will be used to filter tasks. Current date is used to initialize dateFilter.
  // dateFilter and completionFilter state will be passed down to DeliviesContainer.
  // NOTE that dataFilter is in STRING type and not DATE type.
  const [completionFilter, setCompletionFilter] = useState("ALLTASKS"); // set ALLTASKS as default
  const [dateFilter, setDateFilter] = useState(
    new Date().toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  );

  // this function will be passed down using props
  const dateFilterUpdateHandler = (date: string) => {
    setDateFilter(date); // update dateFilter
    console.log("dateFilter updated!", date);
  };

  // this function will be passed down using props
  const completionFilterUpdateHandler = (completionType: string) => {
    setCompletionFilter(completionType); // update completionFilter
    console.log("completionFilter updated!", completionType);
  };

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
        <FiltersContainer
          updateDateFilter={dateFilterUpdateHandler}
          updateCompletionFilter={completionFilterUpdateHandler}
        />
        <DeliveriesContainer
          dateFilter={dateFilter}
          completionFilter={completionFilter}
        />
      </TaskProvider>
    </div>
  );
};

export default TasksContainer;
