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
  const [state, dispatch] = useReducer(Reducer, initialState);
  // const { username } = state;
  console.log("hi");
  console.log(state.showPassword);
  
  let noDeliveries = false;
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
            Welcome back,
          </Typography>
          <Typography
            sx={{ font: "Poppins", color: "#666666", "font-weight": "500" }}
          >
            {state.username}
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
          {!noDeliveries && <DeliveryTimeline />}{" "}
          {/* display the screen of the timeline */}
        </Box>
      </Box>
      {noDeliveries && <NoDeliveries />}{" "}
      {/* display the screen for no deliveries  */}
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
