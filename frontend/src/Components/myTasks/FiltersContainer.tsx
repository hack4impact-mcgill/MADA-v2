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
        ml: 2,
        mr: 2,
        mb: 3,
      }}
    >
      <TaskDateFilter />
      <TaskCompletionFilter />
    </Box>
  );
};

export default FiltersContainer;
