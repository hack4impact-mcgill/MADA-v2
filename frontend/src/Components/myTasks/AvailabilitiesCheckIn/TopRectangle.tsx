import React from "react";
import { Box } from "@mui/material";

const TopRectangle = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: 152,
        bgcolor: "white",
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottom: 1,
        borderColor: "#E8E6E6",
        marginBottom: 15
      }}
    ></Box>
  );
};

export default TopRectangle;
