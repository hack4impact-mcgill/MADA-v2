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
            borderRight: "10px",
            width: "40px",
            height: "56px",
            marginRight: "3px",
          }}
        >
          M
        </Typography>
        <TaskDateFilter />
      </Box>
      <TaskCompletionFilter />
    </Box>
  );
};

export default FiltersContainer;
