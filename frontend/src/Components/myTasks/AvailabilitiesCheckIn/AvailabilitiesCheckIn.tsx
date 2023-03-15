import React from "react";
import { Box, Typography } from "@mui/material";
import { CgDanger } from "react-icons/cg";

const AvailabilitiesCheckIn = () => {
  return (
    <Box
      sx={{
        width: "85%",
        height: 80,
        bgcolor: "white",
        borderRadius: "10px",
        borderBottom: 1,
        borderColor: "#E8E6E6",
        top: 106,
        position: "absolute",
        transform: "translate(-50%, 0)", // put absolute positioned item in the center
        left: "50%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          marginLeft: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: 400,
            fontSize: 10,
            color: "#FB4B4B",
          }}
        >
          Not Completed
        </Typography>
        <Typography
          sx={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 18 }}
        >
          Availability Check-In
        </Typography>
        <Typography
          sx={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 12 }}
        >
          Mark Your Weekly Availabilities
        </Typography>
      </Box>
      <CgDanger size="45" style={{ marginRight: 20, color: "#FB4B4B" }} />
    </Box>
  );
};

export default AvailabilitiesCheckIn;
