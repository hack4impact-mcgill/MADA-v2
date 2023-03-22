import React from "react";
import { Box, Typography } from "@mui/material";
import CloseButton from "../Components/MyHistory/CloseButton";
import DateRangeFilterContainer from "../Components/MyHistory/DateRangeFilterContainer";
import HistoryTasksContainer from "../Components/MyHistory/HistoryTasksContainer";
import { useState } from "react";

const HistoryContainer = () => {
  const [startDate, setStartDate] = useState(new Date("14 Mar 2023")); // dummy dates for now
  const [endDate, setEndDate] = useState(new Date());

  return (
    <Box
      sx={{
        margin: 0,
        fontFamily: "Poppins",
        bgcolor: "#FAF9F9",
        width: "100%",
        height: "100%",
      }}
    >
      <CloseButton />
      <DateRangeFilterContainer />
      <HistoryTasksContainer startDate={startDate} endDate={endDate} />
    </Box>
  );
};

export default HistoryContainer;
