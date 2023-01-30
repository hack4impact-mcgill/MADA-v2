import React from "react";
import { Box, FormControlLabel, Checkbox } from "@mui/material";

const Delivery = (props: { isCompleted: Boolean }) => {
  return (
    <Box>
      <FormControlLabel
        control={<Checkbox checked={true} /*onChange*/ />}
        label='John Doe'
      />
    </Box>
  );
};

export default Delivery;
