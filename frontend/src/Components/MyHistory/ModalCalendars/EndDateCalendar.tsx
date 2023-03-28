import React from "react";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const EndDateCalendar = (props: {
  selectEndDate: Function;
  updateIsSelectingStartDate: Function;
  endDate: Date | null;
}) => {
  return (
    <>
      <Typography
        fontFamily={"Poppins"}
        fontSize={"18px"}
        sx={{ ml: "36.7px", mt: 2 }}
      >
        Choose End Date
      </Typography>
      <DateCalendar
        // defaultValue={props.endDate ? props.endDate : new Date()}
        value={dayjs(props.endDate ? props.endDate : new Date())}
        onChange={(newEndDate) => {
          // update state for end date
          props.selectEndDate(newEndDate);
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Button
          sx={{ bgcolor: "#3A71FF", color: "white", mr: "5px" }}
          onClick={() => {
            // to display start date selecting calendar
            props.updateIsSelectingStartDate(true);
          }}
        >
          Back
        </Button>
        <Button sx={{ bgcolor: "#C4C4C4", ml: "5px" }} disabled>
          Next
        </Button>
      </Box>
    </>
  );
};

export default EndDateCalendar;
