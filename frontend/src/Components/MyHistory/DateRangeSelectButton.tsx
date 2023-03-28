import React from "react";
import {
  Box,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
} from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const DateRangeSelectButton = (props: { openModal : Function }) => {
  // opens date range select modal when clicked
  const dateRangeFilterHandler = () => {
    console.log("date filter range is changed");
  };

  return (
    <Box
      sx={{
        width: 203,
        height: 43,
        mt: "20px",
        mb: "20px",
        bgcolor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
      }}
    >
      <Button sx={{ color: "#666666", width: "100%" }} onClick={() => {
        // open date range select modal when clicked
        props.openModal();
      }}>
        select date range
      </Button>
    </Box>
  );
};

export default DateRangeSelectButton;
