import React from "react";
import { Box, Typography } from "@mui/material";

const DeliveryLabel = (props: {
  isCompleted: boolean;
  name: string;
}) => {
  return (
    <Box sx={{ ml: 2 }}>
      <Typography sx={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 18 }}>
        {props.name}
      </Typography>
    </Box>
  );
};

export default DeliveryLabel;
