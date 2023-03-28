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
    // <FormControl sx={{ width: 203, mt: "22px" }}>
    //   <Select
    //     labelId="task-completion-select-label"
    //     id="task-copmletion-select"
    //     label="date range select filter"
    //     value={1}
    //     className="select"
    //     onChange={dateRangeFilterHandler}
    //     sx={{
    //       bgcolor: "#FFFFFF",
    //       borderRadius: "10px",
    //       boxShadow: "none",
    //       ".MuiOutlinedInput-notchedOutline": { border: 0 },
    //       height: 50,
    //     }}
    //   >
    //     <MenuItem value={1}>Filter By Date Range</MenuItem>
    //   </Select>
    // </FormControl>
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
