import React, { useContext, useState } from "react";
import { Box, Typography } from "@mui/material";
import TaskDateFilter from "./TaskDateFilter";
import { TaskCompletionFilter } from "./TaskCompletionFilter";
import { DateContext } from "../../Contexts/Date";

const FiltersContainer = (props: { updateCompletionFilter: Function }) => {
  const dateContext = useContext(DateContext);
  // selectedDayOfWeek was supposed to be the first letter of a day according to the design.
  // e.g. M for Monday,  R for Thursday, U for Sunday
  // but first three letters seems to be better. U for Sunday or R for Thursday might be confusing.
  const selectedDayOfWeek = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(
    new Date(dateContext?.dateFilter ? dateContext.dateFilter : new Date())
  );

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
        <TaskDateFilter />
      </Box>
      <TaskCompletionFilter
        updateCompletionFilter={props.updateCompletionFilter}
      />
    </Box>
  );
};

export default FiltersContainer;
