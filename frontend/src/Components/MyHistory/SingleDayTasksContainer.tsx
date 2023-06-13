import React from "react";
import { Box, Typography } from "@mui/material";
import HistoryTaskDate from "./HistoryTaskDate";
import { TaskInterface } from "../../Contexts/Tasks";

const SingleDayTasksContainer = (props: {
  date: Date;
  historyTasks: TaskInterface[];
}) => {
  const filteredTasks = props.historyTasks.filter(
    (task) => task.date.toDateString() === props.date.toDateString()
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <HistoryTaskDate date={props.date} />
      {filteredTasks.map((task) => (
        <Box
          key={task.id}
          sx={{
            display: "flex",
            mb: 1,
            p: 1,
            bgcolor: "#FFFFFF",
            border: "1px solid #DFDFDF",
            borderRadius: 2,
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Typography sx={{ mr: 1 }}>client name</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default SingleDayTasksContainer;
