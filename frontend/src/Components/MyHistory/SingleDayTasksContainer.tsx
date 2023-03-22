import React from "react";
import { Box, Typography } from "@mui/material";
import HistoryTaskDate from "./HistoryTaskDate";

const SingleDayTasksContainer = (props : {date : Date}) => {
  return (
    <Box sx={{}}>
        <HistoryTaskDate date={props.date} />
    </Box>
  );
};

export default SingleDayTasksContainer;