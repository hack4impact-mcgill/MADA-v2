import { Typography, Button, Box, Stack } from "@mui/material";
import {
  DeliveryTimeline,
  NoDeliveries,
} from "../Components/Today/DeliveryTimeline";
import Reducer from "../Contexts/LogIn";
import "../Styles/Delivery.css";
import React, {useReducer} from "react";
import { initialState } from "../Contexts/LogIn";

const TodayContainer = () => {
  
  let noDeliveries = false; //todo
  const handleClick = async () => {
    window.location.href = "/tasks";
  };
  return (
    <Stack className="today-wrapper" spacing={0}>
      <Box className="center">
        <Box
          className="welcome"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Typography
            sx={{ font: "Poppins", color: "#666666", "font-weight": "400" }}
          >
            Welcome back!
          </Typography>
         
          <Typography
            sx={{
              font: "Poppins",
              color: "#666666",
              "font-weight": "600",
              "margin-top": "50px",
            }}
          >
            Today's Deliveries
          </Typography>
          {!noDeliveries && 
          <DeliveryTimeline />}{" "}
        </Box>
      </Box>
      {noDeliveries && <NoDeliveries />}{" "}
      <Box display="flex" width={"100%"} justifyContent="center">
        <Button
          sx={{ backgroundColor: "#33BE41", margin: 0 }}
          variant="contained"
          onClick={handleClick}
        >
          Start Delivery
        </Button>
      </Box>
    </Stack>
  );
};

export default TodayContainer;
