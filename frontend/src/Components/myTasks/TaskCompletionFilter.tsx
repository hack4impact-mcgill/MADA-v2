import React, { useState } from "react";
import './TaskCompletionFilter.css';
import { SelectChangeEvent } from '@mui/material/Select';
import {
    Box,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
  } from "@mui/material";

const TaskCompletionFilter = (props: {}) => {
  const [taskCompletionType, setTaskCompletionType] = useState("allTasks");

  const taskCompletionChangeHandler = (event: SelectChangeEvent<string>) => {
    console.log("date changed");
    setTaskCompletionType(event.target.value);
  };

  return (
    <FormControl sx={{ width: 140 }}>
      <InputLabel id="task-date-select-label">All Tasks</InputLabel>
      <Select
        labelId="task-date-select-label"
        id="task-date-select"
        label={taskCompletionType}
        className="select"
        onChange={taskCompletionChangeHandler}
        sx={{
          bgcolor: "#FFFFFF",
          borderRadius: "10px",
          boxShadow: 'none',
          '.MuiOutlinedInput-notchedOutline': { border: 0 }
        }}
      >
        <MenuItem value={"allTasks"}>All Tasks</MenuItem>
        <MenuItem value={"upcoming"}>Upcoming</MenuItem>
        <MenuItem value={"completed"}>Completed</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TaskCompletionFilter;
