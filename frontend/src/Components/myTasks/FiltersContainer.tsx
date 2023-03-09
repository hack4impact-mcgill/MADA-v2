import React from "react";
import { Box, Typography } from "@mui/material";
import TaskDateFilter from "./TaskDateFilter";
import TaskCompletionFilter from "./TaskCompletionFilter";

const FiltersContainer = (props: {}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
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
          {new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(new Date().getDay()).charAt(0)}
        </Typography>
        <TaskDateFilter />
      </Box>
      <TaskCompletionFilter />
    </Box>
  );
};

export default FiltersContainer;
