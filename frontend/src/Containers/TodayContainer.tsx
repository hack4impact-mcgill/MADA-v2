import { Typography, Button, Box, Stack } from "@mui/material";
import {
  DeliveryTimeline,
  NoDeliveries,
} from "../Components/Today/DeliveryTimeline";
import "../Styles/Delivery.css";
import { getVolunteerTasks } from "../services";
import { useState, useEffect } from "react";

const TodayContainer = () => {
  let volunteerId = 1;

  const [noDeliveries, setNoDeliveries] = useState(false);

  //if there isn't a task assigned to this volunteer for today  
  useEffect(() => {
    //todo get the volunteer task and check for today's date
    getVolunteerTasks(volunteerId).then((res) => { 
      setNoDeliveries(res.tasks.length === 0); 
    });
  }, [])

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
