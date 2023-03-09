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

const TaskDateFilter = (props: {}) => {

  const [displayedDate, setDisplayedDate] = useState(
    new Date().toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  ); // use current date as default

  const taskDateChangeHandler = (event: SelectChangeEvent<string>) => {
    console.log("date changed");
    setDisplayedDate(event.target.value); // update date state with currently selected value
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

        {/* dummy dates for now */}
        <MenuItem value={displayedDate}>{displayedDate}</MenuItem>
        <MenuItem value="7 Dec 2023">7 Dec 2023</MenuItem>
        <MenuItem value="8 Dec 2023">8 Dec 2023</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TaskDateFilter;
