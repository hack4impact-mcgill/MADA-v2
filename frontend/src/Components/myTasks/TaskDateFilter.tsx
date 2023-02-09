import React from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";

const TaskDateFilter = (props: {}) => {
  const [selectedDate, setSelectedDate] = useState("6 Dec 2023");

  const taskDateChangeHandler = () => {
    console.log("date changed");
  };
  return (
    <FormControl sx={{ width: 140 }}>
      <InputLabel id="task-date-select-label">{selectedDate}</InputLabel>
      <Select
        labelId="task-date-select-label"
        id="task-date-select"
        label="6 Dec 2023"
        onChange={taskDateChangeHandler}
      >
        <MenuItem value={10}>6 Dec 2023</MenuItem>
        <MenuItem value={20}>7 Dec 2023</MenuItem>
        <MenuItem value={30}>7 Dec 2023</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TaskDateFilter;
