import React from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";

const TaskDateFilter = (props: { updateDateFilter : Function }) => {
  const [displayedDate, setDisplayedDate] = useState(
    new Date().toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  ); // use current date as default

  // define 7 upcoming days (including current date) that can be displayed
  const date = new Date(); // date variable is used too get following 6 days
  const day1 = new Date();
  date.setDate(day1.getDate() + 1);
  const day2 = new Date(date);
  date.setDate(day1.getDate() + 2);
  const day3 = new Date(date);
  date.setDate(day1.getDate() + 3);
  const day4 = new Date(date);
  date.setDate(day1.getDate() + 4);
  const day5 = new Date(date);
  date.setDate(day1.getDate() + 5);
  const day6 = new Date(date);
  date.setDate(day1.getDate() + 6);
  const day7 = new Date(date);

  // function that formats date to desired form: e.g. 8 Dec 2023
  const formatDate = (date: Date) => {
    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const taskDateChangeHandler = (event: SelectChangeEvent<string>) => {
    console.log("date changed");
    setDisplayedDate(event.target.value); // update date state with currently selected value
    props.updateDateFilter(event.target.value); // update date filter in the TasksContainer component!
  };

  return (
    <FormControl sx={{ width: 140, height: 47 }}>
      <InputLabel id="task-date-select-label">Date Filter</InputLabel>
      <Select
        labelId="task-date-select-label"
        id="task-date-select"
        label={displayedDate}
        value={displayedDate}
        onChange={taskDateChangeHandler}
        sx={{
          bgcolor: "white",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
          borderBottomLeft: "0px",
          borderTopLeft: "0px",
          boxShadow: "none",
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
        }}
      >
        {/* Display upcoming 7 days as options, including current day */}
        <MenuItem value={formatDate(day1)}>{formatDate(day1)}</MenuItem>
        <MenuItem value={formatDate(day2)}>{formatDate(day2)}</MenuItem>
        <MenuItem value={formatDate(day3)}>{formatDate(day3)}</MenuItem>
        <MenuItem value={formatDate(day4)}>{formatDate(day4)}</MenuItem>
        <MenuItem value={formatDate(day5)}>{formatDate(day5)}</MenuItem>
        <MenuItem value={formatDate(day6)}>{formatDate(day6)}</MenuItem>
        <MenuItem value={formatDate(day7)}>{formatDate(day7)}</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TaskDateFilter;
