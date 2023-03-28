import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";

const EndDateCalendar = (props: {
  selectEndDate: Function;
  updateIsSelectingStartDate: Function;
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
        onChange={() => {
          // update state for end date
          props.selectEndDate();
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
