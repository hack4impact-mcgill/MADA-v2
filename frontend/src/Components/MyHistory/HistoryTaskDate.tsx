import React from "react";
import { Box, Typography, Divider} from "@mui/material";
import { useState } from "react";

const HistoryTaskDate = (props: { date: Date }) => {
  const getShortDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
  };

  // function that formats date to desired form: e.g. 8 Dec 2023
  const formatDate = (date: Date) => {
    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        fontSize: "15px"
      }}
    >
      <Box sx={{ margin: 1 }}>{getShortDate(props.date)}</Box>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Box sx={{ margin: 1 }}>{formatDate(props.date)}</Box>
    </Box>
    <Divider />
    </>
  );
};

export default HistoryTaskDate;
