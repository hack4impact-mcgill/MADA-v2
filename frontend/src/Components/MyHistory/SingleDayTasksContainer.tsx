import React from "react";
import { Box, Typography } from "@mui/material";
import HistoryTaskDate from "./HistoryTaskDate";
import { TaskInterface } from "../../Contexts/Tasks";

const SingleDayTasksContainer = (props: {
  date: Date;
  historyTasks: TaskInterface[];
}) => {
  console.log(Array.isArray(props.historyTasks));
  console.log("props.historyTasks:", props.historyTasks);
  console.log(props.date);

  if (props.historyTasks.length > 0){
  return (
    <Box sx={{display: "flex", flexDirection: "column"}}>
      <HistoryTaskDate date={props.date} />
      {props.historyTasks.map((task) => (
        <Box key={task.id} sx={{ display: "flex", mb: 1, p: 1, bgcolor: "#FFFFFF", border: "1px solid #DFDFDF", borderRadius: 2, flexDirection: "column", justifyContent: "flex-start" }}>
           <Typography sx={{ mr: 1 }}>{task.volunteer ? task.volunteer.name : task.id}</Typography>  {/*USING ID FOR NOW */}
          <Typography variant="caption">
            {"Delivered at " + new Date(task.date).toLocaleTimeString()} 
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
else {
  return <div></div>
}
}

export default SingleDayTasksContainer;


