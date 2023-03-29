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

const TaskDateFilter = (props: {
  updateDateFilter: Function;
  updateDayOfWeek: Function;
}) => {
  // function that formats date to desired form: e.g. 8 Dec 2023
  const formatDate = (date: Date) => {
    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const [displayedDate, setDisplayedDate] = useState(formatDate(new Date())); // use current date as default

  // get 7 upcoming days (including current date) that can be displayed
  // not sure if there is a better way to get dates for the current day and the next 6 days.
  const getUpcoming7Days = () => {
    const date = new Date(); // date variable is used to get the following 6 days.
    const today = new Date(); // today's date
    const upcoming7Days = [];
    for (let numOfDaysfromToday = 0; numOfDaysfromToday < 7; numOfDaysfromToday++) {
      date.setDate(today.getDate() + numOfDaysfromToday);
      const followingDay = new Date(date);
      upcoming7Days.push(followingDay);
    }
    return upcoming7Days;
  }

  const taskDateChangeHandler = (event: SelectChangeEvent<string>) => {
    console.log("date changed");
    setDisplayedDate(event.target.value); // update date state with currently selected value
    props.updateDateFilter(event.target.value); // update date filter in the TasksContainer component!
    props.updateDayOfWeek(
      new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
        new Date(event.target.value)
      )
    ); // update selectedDayOfWeek in FiltersCotainer component!
    console.log(
      new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
        new Date(event.target.value)
      )
    );
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
          return <MenuItem value={formatDate(date)}>{formatDate(date)}</MenuItem>
        })}
      </Select>
    </FormControl>
  );
};

export default TaskDateFilter;