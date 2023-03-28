import React from "react";
import { Box, Button } from "@mui/material";
import { AiFillCloseCircle } from "react-icons/ai";

const ModalCloseButton = (props : { closeModal : Function }) => {
  return (
    <Button
      sx={{
        mt: "20px",
        ml: "5px",
        padding: 0,
        maxWidth: '30px'
      }}
      onClick={() => {
        // close date range select modal
        props.closeModal();
      }}
    >
        <AiFillCloseCircle style={{ color: "#2E5CD3" }} size="29"></AiFillCloseCircle>
    </Button>
  );
};

export default ModalCloseButton;