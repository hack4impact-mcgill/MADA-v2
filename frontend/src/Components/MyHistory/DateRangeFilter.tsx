import React from "react";
import { Box,FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const DateRangeFilter = () => {
  const dateRangeFilterHandler = () => {
    console.log("date filter range is changed");
  }

  return (
    <FormControl sx={{ width: 203, mt: "22px" }}>
      <Select
        labelId="task-completion-select-label"
        id="task-copmletion-select"
        label="date range select filter"
        value={1}
        className="select"
        onChange={dateRangeFilterHandler}
        sx={{
          bgcolor: "#FFFFFF",
          borderRadius: "10px",
          boxShadow: "none",
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
          height: 50,
        }}
      >
        <MenuItem value={1}>Filter By Date Range</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DateRangeFilter;
