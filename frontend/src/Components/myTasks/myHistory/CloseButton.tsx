import React from "react";
import { Box, Button } from "@mui/material";
import { AiFillCloseCircle } from "react-icons/ai";

const CloseButton = (props: { modalCloseHandler: Function }) => {
  return (
    <Button
      sx={{
        marginTop: 1
      }}
      onClick={() => {
        alert("clicked");
        // show History overlay when button clicked
      }}
    >
        <AiFillCloseCircle style={{ color: "#2E5CD3" }} size="29"></AiFillCloseCircle>
    </Button>
  );
};

export default CloseButton;
