import React from "react";
import { useState } from "react";
import { Box, Typography, Modal, Button } from "@mui/material";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloseButton from "../Components/MyHistory/CloseButton";
import DateRangeFilterContainer from "../Components/MyHistory/DateRangeFilterContainer";
import HistoryTasksContainer from "../Components/MyHistory/HistoryTasksContainer";
import ModalCloseButton from "../Components/MyHistory/ModalCloseButton";
import StartDateCalendar from "../Components/MyHistory/ModalCalendars/StartDateCalendar";
import EndDateCalendar from "../Components/MyHistory/ModalCalendars/EndDateCalendar";

const HistoryContainer = () => {
  const [startDate, setStartDate] = useState<Date | null>(null); // Initialize with null, so that user can select date range.
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // for date select modal
  const [isSelectingStartDate, setIsSelectingStartDate] = useState(true); // to display different modal calendars, for choosing start date and end date.

  const modalCloseHandler = () => {
    setIsModalOpen(false);
    console.log("date select modal closed");
  };

  const modalOpenHandler = () => {
    setIsModalOpen(true);
    console.log("history modal opened");
  };

  const startDateChangeHandler = (newStartDate: Date | null) => {
    setStartDate(newStartDate);
    console.log("start date changed, ", newStartDate);
  };

  const endDateChangeHandler = (newEndDate: Date | null) => {
    setEndDate(newEndDate);
    console.log("end date changed", newEndDate);
  };

  const updateIsSelectingStartDate = (isStartCalendar: boolean) => {
    setIsSelectingStartDate(isStartCalendar); // needed to display end date selecting modal calendar
  };

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
        <DateRangeFilterContainer openModal={modalOpenHandler} />
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
            <Box sx={{ bgcolor: "white", width: "90%", borderRadius: "10px" }}>
              <ModalCloseButton closeModal={modalCloseHandler} />
              {isSelectingStartDate ? (
                <StartDateCalendar
                  selectStartDate={startDateChangeHandler}
                  updateIsSelectingStartDate={updateIsSelectingStartDate}
                  startDate={startDate}
                />
              ) : (
                <EndDateCalendar
                  selectEndDate={endDateChangeHandler}
                  updateIsSelectingStartDate={updateIsSelectingStartDate}
                  endDate={endDate}
                />
              )}
            </Box>
          </Modal>
        )}
      </LocalizationProvider>
    </Box>
  );
};

export default HistoryContainer;
