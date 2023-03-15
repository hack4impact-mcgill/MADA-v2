import React from "react";
import DeliveriesContainer from "../Components/myTasks/DeliveriesContainer";
import "./TasksContainer.css";
import FiltersContainer from "../Components/myTasks/FiltersContainer";
import TopRectangle from "../Components/myTasks/AvailabilitiesCheckIn/TopRectangle";
import AvailabilitiesCheckIn from "../Components/myTasks/AvailabilitiesCheckIn/AvailabilitiesCheckIn";
import CheckInButton from "../Components/myTasks/AvailabilitiesCheckIn/CheckInButton";
import HistoryButton from "../Components/myTasks/HistoryButton";
import { TaskProvider } from "../contexts/Tasks";
import { Box, Typography, Modal } from "@mui/material";
import HistoryContainer from "./HistoryContainer";
import { useState } from "react";

const TasksContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // for history container modal

  const modalCloseHandler = () => {
    setIsModalOpen(false);
    console.log("history modal closed");
  };

  const modalOpenHandler = () => {
    setIsModalOpen(true);
    console.log("history modal opened");
  };

  return (
    <div className="tasks-container">
      {/* enable accessing Task Context */}
      <TaskProvider>
        <TopRectangle />
        <AvailabilitiesCheckIn />
        <CheckInButton />
        <HistoryButton />
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: 600,
            fontSize: 25,
            ml: 2,
            mb: 1,
          }}
        >
          My Deliveries
        </Typography>
        <FiltersContainer />
        <DeliveriesContainer />
      </TaskProvider>
      <Modal
        open={true}
        onClose={modalCloseHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{}}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default TasksContainer;
