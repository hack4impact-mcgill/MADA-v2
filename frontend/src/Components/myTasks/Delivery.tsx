import React from "react";
import { Box, FormControlLabel, Checkbox, Typography } from "@mui/material";
import DeliveryLabel from "./DeliveryLabel";
import './Delivery.css';

const Delivery = (props: {
  isCompleted: boolean;
  deliveryTime: Date;
  name: string;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: "Poppins",
        bgcolor: !props.isCompleted ? "#FFFFFF" : "#DFDFDF",
        opacity: !props.isCompleted ? 1 : 0.7,
        height: 99,
        width: "100%",
        mb: 1,
        borderRadius: 2
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 40 },
              ml: 2,
              "&.Mui-checked": {
                color: 'white',
              }
            }}
            checked={props.isCompleted} /*onChange*/
          />
        }
        label={
          <DeliveryLabel
            isCompleted={props.isCompleted}
            deliveryTime={props.deliveryTime}
            name={props.name}
          />
        }
      />
      <Box sx={{mr: 3, width: "15px", height: "25px", backgroundColor: "auto"}} className="Logo"><div className="Logo"></div></Box>
    </Box>
  );
};

export default Delivery;
