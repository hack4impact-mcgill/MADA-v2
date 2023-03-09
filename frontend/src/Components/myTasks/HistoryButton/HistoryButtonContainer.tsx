import React from "react";
import { Box } from "@mui/material";
import HistoryButton from "./HistoryButton";

const HistoryButtonContainer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
        marginRight: "22px"
      }}
    >
      <HistoryButton />
    </Box>
  );
};

export default HistoryButtonContainer;