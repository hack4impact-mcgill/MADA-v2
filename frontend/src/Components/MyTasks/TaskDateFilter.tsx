import React, { useContext, useState } from "react";
import { DateContext } from "../../Contexts/Date";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const TaskDateFilter = () => {
  // function that formats date to desired form: e.g. 8 Dec 2023
  const formatDate = (date: Date) => {
    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const dateContext = useContext(DateContext);
  const displayedDate = dateContext?.dateFilter; // uses the current date as default selected date.

  // function that gets 7 upcoming days (including current date) that can be displayed
  const getUpcoming7Days = () => {
    const date = new Date(); // date variable is used to get the following 6 days.
    const upcoming7Days = [];
    for (let numOfDaysfromToday = 0; numOfDaysfromToday < 7; numOfDaysfromToday++) {
      const currentDay = new Date(date);
      upcoming7Days.push(currentDay);
      date.setDate(date.getDate() + 1);
    }
    return upcoming7Days;
  }

  const taskDateChangeHandler = (event: SelectChangeEvent<string>) => {
    console.log("date changed");
    dateContext?.setDateFilter(event.target.value); // update date context with new date filter
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
        {getUpcoming7Days().map((date : Date) => {
          return <MenuItem value={formatDate(date)} key={date.toString()}>{formatDate(date)}</MenuItem>
        })}
      </Select>
    </FormControl>
  );
};

export default TaskDateFilter;
