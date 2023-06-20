import React from "react";
import DeliveriesContainer from "../Components/MyTasks/DeliveriesContainer";
import FiltersContainer from "../Components/MyTasks/FiltersContainer";
import TopRectangle from "../Components/MyTasks/AvailabilitiesCheckIn/TopRectangle";
import AvailabilitiesCheckIn from "../Components/MyTasks/AvailabilitiesCheckIn/AvailabilitiesCheckIn";
import CheckInButton from "../Components/MyTasks/AvailabilitiesCheckIn/CheckInButton";
import HistoryButtonContainer from "../Components/MyTasks/HistoryButton/HistoryButtonContainer";
import { TaskProvider } from "../Contexts/Tasks";
import { Typography, Modal, Box } from "@mui/material";
import { useState } from "react";

const TasksContainer = () => {
  // dateFilter and completionFilter state will be used to filter tasks. Current date is used to initialize dateFilter in its context.
  // completionFilter state will be passed down to DeliviesContainer.
  const [completionFilter, setCompletionFilter] = useState("ALLDELIVERIES"); // set ALLDELIVERIES as default

  // this function will be passed down using props
  const completionFilterUpdateHandler = (completionType: string) => {
    setCompletionFilter(completionType); // update completionFilter
    console.log("completionFilter updated!", completionType);
  };

  return (
    <div className="tasks-container">
      {/* enable accessing Task Context by using TaskProvider */}
      <TaskProvider>
        <Box sx={{ position: "relative" }}>
          <TopRectangle />
          <AvailabilitiesCheckIn />
          <CheckInButton />
        </Box>
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
          updateCompletionFilter={completionFilterUpdateHandler}
        />
        <DeliveriesContainer
          completionFilter={completionFilter}
        />
      </TaskProvider>
      {/* <Modal
         open={isModalOpen}
         onClose={modalCloseHandler}
        //  aria-labelledby="modal-modal-title"
        //  aria-describedby="modal-modal-description"
       >
         <HistoryContainer modalCloseHandler={modalCloseHandler}/>
       </Modal> */}
    </div>
  );
};

export default TasksContainer;
