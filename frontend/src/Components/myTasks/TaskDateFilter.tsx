import React from "react";
import { SelectChangeEvent } from '@mui/material/Select';
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

  const taskDateChangeHandler = (event: SelectChangeEvent<string>) => {
    console.log("date changed");
    setSelectedDate(event.target.value);
  };

  return (
    <FormControl sx={{ width: 140, height: 47 }}>
      <InputLabel id="task-date-select-label">{selectedDate}</InputLabel>
      <Select
        labelId="task-date-select-label"
        id="task-date-select"
        label={selectedDate}
        onChange={taskDateChangeHandler}
        sx={{
          bgcolor: "white",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
          borderBottomLeft: '0px',
          borderTopLeft: '0px',
          boxShadow: 'none',
          '.MuiOutlinedInput-notchedOutline': { border: 0 }
        }}
      >
        <MenuItem value={"6 Dec 2023"}>6 Dec 2023</MenuItem>
        <MenuItem value={"7 Dec 2023"}>7 Dec 2023</MenuItem>
        <MenuItem value={"8 Dec 2023"}>8 Dec 2023</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TaskDateFilter;
