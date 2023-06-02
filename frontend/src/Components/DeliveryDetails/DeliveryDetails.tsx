import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MealDeliveryInterface, TaskInterface } from "../../Contexts/Tasks";
import { useLocation } from "react-router-dom";
import CloseButton from "../MyHistory/CloseButton";
import { isBrowser } from "react-device-detect";

export default function DeliveryDetails(props: { delivery: MealDeliveryInterface | null }) {
  console.log(props.delivery);
  const location = useLocation();
  const delivery = location.state?.delivery; // allows passing state value through Link

  return delivery ? (
    <Box>
      {/* <Box sx={{ position: "fixed" }}> */}
      <CloseButton></CloseButton>
      {/* </Box> */}
      <Box
        sx={{
          justifyContent: "center",
          alignContent: "center",
          alignSelf: "center",
          marginTop: isBrowser ? "5vh" : "5vh",
          alignItems: "center",
          paddnig: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: 25,
              ml: "22px",
              mb: 1,
            }}
          >
            Delivery Information
          </Typography>

          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: 17,
              ml: "22px",
              mb: 1,
            }}
          >
            Name
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 300,
              fontSize: 17,
              ml: "22px",
              mb: 1,
            }}
          >
            {delivery.client.name}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: 17,
              ml: "22px",
              mb: 1,
            }}
          >
            Address
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 300,
              fontSize: 17,
              ml: "22px",
              mb: 1,
            }}
          >
            {delivery.client.address}
            {/* 3380 Bd Robert-Bourassa Montreal QC */}
          </Typography>
          {/* <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: 17,
              ml: "22px",
              mb: 1,
            }}
          >
            Date and Time
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 300,
              fontSize: 17,
              ml: "22px",
              mb: 1,
            }}
          >
            April 27, 2023 2:55PM
          </Typography> */}
          {/* <Typography>{delivery.deliveryTime}</Typography> */}
        </Box>
        <div className="google-map-code">
          <iframe
            src="https://maps.google.com/maps?q=3380+Bd+Robert-Bourassa+Montreal+QC&output=embed"
            width={isBrowser ? "600" : "350"}
            height={isBrowser ? "450" : "300"}
            // frameborder="0"
            style={{ border: 2, margin: "30px" }}
            // allowfullscreen
          ></iframe>
        </div>
      </Box>
    </Box>
  ) : null;
}
