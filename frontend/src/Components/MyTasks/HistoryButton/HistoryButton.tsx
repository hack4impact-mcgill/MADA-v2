import React from "react";
import { Box, Button } from "@mui/material";

const HistoryButton = () => {
  return (
    <Button
      sx={{
        width: 107,
        height: 35,
        boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.15)",
        borderRadius: "10px",
        opacity: 1,
        bgcolor: "white",
        color: "#666666",
        fontSize: 10,
      }}
      onClick={() => {
        // redirect to History page when button clicked
        window.location.href = "/history";
      }}
    >
      View History
    </Button>
  );
};

export default HistoryButton;
