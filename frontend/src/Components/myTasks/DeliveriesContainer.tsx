import React from "react";
import Delivery from "./Delivery";
import { Box } from "@mui/material";

const DeliveriesContainer = () => {
  return (
    <Box sx={{mr: 2, ml: 2, borderRadius: 3}}>
      <Delivery
        isCompleted={true}
        deliveryTime={new Date()}
        name={"Jane Doe"}
      ></Delivery>
      <Delivery
        isCompleted={false}
        deliveryTime={new Date()}
        name={"Leopold Bennett"}
      ></Delivery>
      <Delivery
        isCompleted={false}
        deliveryTime={new Date()}
        name={"Avi Sharp"}
      ></Delivery>
      <Delivery
        isCompleted={true}
        deliveryTime={new Date()}
        name={"Zahara Lott"}
      ></Delivery>
    </Box>
  );
};

export default DeliveriesContainer;