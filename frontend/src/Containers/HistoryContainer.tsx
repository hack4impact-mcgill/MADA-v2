import React from "react";
import { Box, Typography, Modal, Button } from "@mui/material";
import CloseButton from "../Components/MyHistory/CloseButton";
import DateRangeFilterContainer from "../Components/MyHistory/DateRangeFilterContainer";
import HistoryTasksContainer from "../Components/MyHistory/HistoryTasksContainer";
import { useState } from "react";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const HistoryContainer = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date("12 March 2023")); // dummy dates for now
  const [endDate, setEndDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(true); // for date select modal

  const modalCloseHandler = () => {
    setIsModalOpen(false);
    console.log("date select modal closed");
  };

  const modalOpenHandler = () => {
    setIsModalOpen(true);
    console.log("history modal opened");
  };

  const startDateChangeHandler = (newStartDate : Date | null) => {
    setStartDate(newStartDate);
    console.log("start date changed");
  }

  return (
    <Box
      sx={{
        margin: 0,
        fontFamily: "Poppins",
        bgcolor: "#FAF9F9",
        width: "100%",
        height: "100%",
      }}
    >
      {/* LocalizationProvider is required for DateCalendar MUI Component. */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CloseButton />
        <DateRangeFilterContainer />
        <HistoryTasksContainer startDate={startDate} endDate={endDate} />
        {isModalOpen && (
          <Modal
            open={isModalOpen}
            onClose={modalCloseHandler}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
              bgcolor: "transparent",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <HistoryContainer modalCloseHandler={modalCloseHandler}/> */}
            <Box sx={{ bgcolor: "white", width: "45%", borderRadius: "10px" }}>
              <Typography
                fontFamily={"Poppins"}
                fontSize={"18px"}
                sx={{ ml: "36.7px", mt: 4 }}
              >
                Choose Start Date
              </Typography>
              <DateCalendar onChange={startDateChangeHandler}/>
            </Box>
          </Modal>
        )}
      </LocalizationProvider>
    </Box>
  );
};

export default HistoryContainer;
