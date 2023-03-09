import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import TaskDateFilter from "./TaskDateFilter";
import TaskCompletionFilter from "./TaskCompletionFilter";

const FiltersContainer = (props: { updateDateFilter : Function, updateCompletionFilter : Function }) => {
  // selectedDayOfWeek is the first letter of a day. e.g. M for Monday,  R for Thursday, U for Sunday
  // but in my opinion first three letters looks better. U for Sunday or R for Thursday might be confusing.
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState(
    new Intl.DateTimeFormat("en-US", { weekday: "short" })
      .format(new Date())
  );

  const selectedDayOfWeekUpdateHandler = (date : string) => {
    setSelectedDayOfWeek(date);
    console.log("Day of week updated", date);
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        ml: "22px",
        mr: "22px",
        mb: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
            borderTopRightRadius: "4px",
            borderBottomRightRadius: "4px",
            width: "40px",
            height: "56px",
            marginRight: "3px",
          }}
        >
          {/* get current day of the week, and display only the first letter. */}
          {selectedDayOfWeek}
        </Typography>
        {/* pass down updateDateFilterFunction */}
        <TaskDateFilter updateDateFilter={props.updateDateFilter} updateDayOfWeek={selectedDayOfWeekUpdateHandler}/> 
      </Box>
      <TaskCompletionFilter updateCompletionFilter={props.updateCompletionFilter}/>
    </Box>
  );
};

export default FiltersContainer;
