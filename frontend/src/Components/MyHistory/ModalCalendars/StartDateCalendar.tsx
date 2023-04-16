import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from 'dayjs'; // dayjs is needed for calendar

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
        <Button sx={{ bgcolor: "#C4C4C4", mr: "5px" }} disabled>
          Back
        </Button>
        <Button
          sx={{ bgcolor: "#3A71FF", color: "white", ml: "5px" }}
          onClick={() => {
            // to display end date selecting calendar
            props.updateIsSelectingStartDate(false);
          }}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default StartDateCalendar;
