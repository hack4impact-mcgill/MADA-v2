import React from "react";
import {
    Box,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
  } from "@mui/material";

const TaskCompletionFilter = (props: {}) => {
  return (
    <FormControl sx={{ width: 140 }}>
      <InputLabel id="task-date-select-label">All Tasks</InputLabel>
      <Select
        labelId="task-date-select-label"
        id="task-date-select"
        label="6 Dec 2023"
      >
        <MenuItem value={"allTasks"}>All Tasks</MenuItem>
        <MenuItem value={"upcoming"}>Upcoming</MenuItem>
        <MenuItem value={"completed"}>Completed</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TaskCompletionFilter;
