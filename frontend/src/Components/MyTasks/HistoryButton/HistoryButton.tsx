import React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

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
    >
      <Link to="/history" style={{ color: 'inherit', textDecoration: 'inherit'}}>View History</Link>
    </Button>
  );
};

export default HistoryButton;
