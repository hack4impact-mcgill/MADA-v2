import React from "react";
import { Box, Typography } from "@mui/material";
import CloseButton from "../Components/MyTasks/myHistory/CloseButton";

const HistoryContainer = (props: { modalCloseHandler: Function }) => {
  return (
    <Box
      sx={{
        margin: 0,
        fontFamily: "Poppins",
        bgcolor: "#FAF9F9",
        width: "100%",
        height: "100%",
      }}
    >
      <CloseButton modalCloseHandler={props.modalCloseHandler}/>
      <div>Hello this is the history page</div>
    </Box>
  );
};

export default HistoryContainer;
