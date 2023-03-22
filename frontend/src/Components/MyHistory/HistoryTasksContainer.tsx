import React from "react";
import { Box, Typography } from "@mui/material";
import SingleDayTasksContainer from "./SingleDayTasksContainer";

const HistoryTasksContainer = () => {
  return (
    <Box sx={{ ml : "14px", mr: "14px" }}>
        <SingleDayTasksContainer date={new Date()}/>
    </Box>
  );
};

export default HistoryTasksContainer;
