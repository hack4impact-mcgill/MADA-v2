import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs"; // dayjs is needed for calendar

const StartDateCalendar = (props: {
  selectStartDate: Function;
  updateIsSelectingStartDate: Function;
  startDate: Date | null;
}) => {
  return (
    <>
      <Typography
        fontFamily={"Poppins"}
        fontSize={"18px"}
        sx={{ ml: "36.7px", mt: 2 }}
      >
        Choose Start Date
      </Typography>
      <DateCalendar
        value={props.startDate ? dayjs(props.startDate) : null} // select no date if startDate is not selected at all.
        onChange={(newStartDate) => {
          // update state for start date
          props.selectStartDate(newStartDate);
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        {props.startDate ? (
          <Button
            sx={{ bgcolor: "#3A71FF", color: "white", ml: "5px" }}
            onClick={() => {
              // Display end date selecting calendar, only if startDate is selected already.
              props.updateIsSelectingStartDate(false);
            }}
          >
            Next
          </Button>
        ) : (
          // Disable next button when no start date is selected.
          <Button
            disabled
            sx={{ bgcolor: "#C4C4C4", ml: "5px" }}
          >Next</Button>
        )}
      </Box>
    </>
  );
};

export default StartDateCalendar;
