import { Typography, Button, Box } from "@mui/material";
import {
  DeliveryTimeline,
  NoDeliveries,
} from "../Components/Today/DeliveryTimeline";
import "../Styles/Delivery.css";

const TodayContainer = () => {
  let noDeliveries = false;
  return (
    <Box className="today-wrapper">
      <Box className="center">
        <Box
          className="welcome"
          sx={{ display: "flex", flexDirection: "column", "margin-top": "15%" }}
        >
          <Typography
            sx={{ font: "Poppins", color: "#666666", "font-weight": "400" }}
          >
            Welcome back,
          </Typography>
          <Typography
            sx={{ font: "Poppins", color: "#666666", "font-weight": "500" }}
          >
            John
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
        <Button sx={{ backgroundColor: "#33BE41" }} variant="contained">
          Start Delivery
        </Button>
      </Box>
    </Box>
  );
};

export default TodayContainer;
