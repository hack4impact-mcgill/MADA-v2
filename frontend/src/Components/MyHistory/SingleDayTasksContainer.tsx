import React from "react";
import { Box, Typography } from "@mui/material";
import HistoryTaskDate from "./HistoryTaskDate";
import { TaskInterface } from "../../Contexts/Tasks";

const SingleDayTasksContainer = (props : {date : Date, historyTasks : TaskInterface[]}) => {
  return (
    <Box sx={{}}>
        <HistoryTaskDate date={props.date} />
    </Box>
  );
};

export default SingleDayTasksContainer;