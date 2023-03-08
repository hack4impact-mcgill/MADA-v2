import React from "react";
import { Box, Button } from "@mui/material";

const CheckInButton = () => {
  return (
    <Button
        sx={{
            width: 131,
            height: 50,
            boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.15)",
            borderRadius: 3,
            position: "absolute",
            top: 171,
            left: "60%",
            opacity: 1,
            bgcolor: "white",
            color: "#666666",
            fontSize: 10
        }}
      onClick={() => {
        alert("clicked");
      }}
    >
      Check In
    </Button>
  );
};

export default CheckInButton;
