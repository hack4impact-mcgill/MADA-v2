import { Typography, Button, Box, Stack } from "@mui/material";
import {
  DeliveryTimeline,
  NoDeliveries,
} from "../Components/Today/DeliveryTimeline";
import "../Styles/Delivery.css";
import { getVolunteerTodayTask } from "../services";
import { useState, useEffect } from "react";
import {getCurrentUserId} from "../helper"

const TodayContainer = () => {
  let volunteerId = getCurrentUserId();

  const [noDeliveries, setNoDeliveries] = useState(false);
  const [taskId, setTaskId] = useState(-1);

  useEffect(() => {
    if (volunteerId != null && volunteerId != undefined) {
      getVolunteerTodayTask(parseInt(volunteerId)).then((res) => { //this returns either the task to display for today or null
        setNoDeliveries(res == null);
        if (res != null) {
          setTaskId(res)
        }
    });
    }
  }, [taskId]);

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
          {!noDeliveries && <DeliveryTimeline taskId={taskId} />}{" "}
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
