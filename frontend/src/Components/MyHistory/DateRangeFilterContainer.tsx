import React from "react";
import { Box, Typography } from "@mui/material";
import DateRangeFilter from "./DateRangeFilter";

const DateRangeFilterContainer = (props: { openModal : Function }) => {
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
      <DateRangeFilter openModal={props.openModal}/>
    </Box>
  );
};

export default DateRangeFilterContainer;
