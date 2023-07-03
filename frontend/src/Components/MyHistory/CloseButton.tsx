import React from "react";
import { Box, Button } from "@mui/material";
import { AiFillCloseCircle } from "react-icons/ai";

const CloseButton = () => {
  return (
    <Button
      sx={{
        mt: "37px",
        ml: "5px",
        padding: 0,
        // boxShadow: "3px 6px 7px rgba(0, 0, 0, 0.25)",
      }}
      onClick={() => {
        // redirect back to Tasks page when clicked
        history.back();
      }}
    >
        <AiFillCloseCircle style={{ color: "#2E5CD3" }} size="29"></AiFillCloseCircle>
    </Button>
  );
};

export default CloseButton;
