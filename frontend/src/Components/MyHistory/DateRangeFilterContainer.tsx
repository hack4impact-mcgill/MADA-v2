import React from "react";
import { Box, Typography } from "@mui/material";
import DateRangeFilter from "./DateRangeFilter";

const DateRangeFilterContainer = () => {
  return (
    <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    }}>
      <Typography sx={{
        fontSize: 25,
        fontFamily: "Poppins",
        fontWeight: 600,
        mt: "23px"
      }}>My History</Typography>
      <DateRangeFilter/>
    </Box>
  );
};

export default DateRangeFilterContainer;
