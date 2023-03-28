import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";

const StartDateCalendar = (props: {
  selectStartDate: Function;
  updateIsSelectingStartDate: Function;
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
        onChange={() => {
          // update state for start date
          props.selectStartDate();
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
