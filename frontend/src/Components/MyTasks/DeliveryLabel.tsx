import React from "react";
import { Box, Typography } from "@mui/material";

const DeliveryLabel = (props: {
  isCompleted: boolean;
  deliveryTime: Date;
  name: string;
}) => {
  return (
    <Box sx={{ ml: 2 }}>
      <Typography sx={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 18 }}>
        {props.name}
      </Typography>
      <Typography sx={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 15 }}>
        {new Date(props.deliveryTime).toLocaleTimeString('en-US')}
      </Typography>
    </Box>
  );
};

export default DeliveryLabel;
