import React from "react";
import { Box, FormControlLabel, Checkbox, Typography } from "@mui/material";
import DeliveryLabel from "./DeliveryLabel";

const Delivery = (props: { isCompleted: boolean, deliveryTime: Date, name: string}) => {
  return (
    <Box sx={{ display: 'flex', fontFamily: "Poppins", bgcolor: "#FFFFFF", height: 99, width: 'auto' }}>
      <FormControlLabel
        control={
          <Checkbox
            sx={{ "& .MuiSvgIcon-root": { fontSize: 36 }, ml: 1 }}
            checked={true} /*onChange*/
          />
        }
        label={<DeliveryLabel isCompleted={props.isCompleted} deliveryTime={props.deliveryTime} name={props.name}/>}
      />
    </Box>
  );
};

export default Delivery;
