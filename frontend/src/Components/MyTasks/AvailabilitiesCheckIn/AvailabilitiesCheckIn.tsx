import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { CgDanger, CgCheckO } from "react-icons/cg";
import { getAvailabilitiesLastUpdated } from "../../../services";
import { getCurrentUserId } from "../../../helper";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekOfYear); // enable using plugin for dayjs

const AvailabilitiesCheckIn = () => {
  const [isAvailabilityUpdatedThisWeek, setIsAvailabilityUpdatedThisWeek] =
    useState(false);
  const userId: string | null | undefined = getCurrentUserId();
  const intUserId: number = userId ? parseInt(userId) : -1;
  console.log("mee", userId, intUserId);

  useEffect(() => {
    const isAvailUpdated = async () => {
      const availabilityLastUpdated = await getAvailabilitiesLastUpdated(
        intUserId
      );
      console.log("lastUpdated Date is: ", availabilityLastUpdated);
      const weekOfLastUpdatedDate = dayjs("2023-07-07").week();
      const currentWeek = dayjs(new Date()).week();
      console.log(
        "this week: ",
        currentWeek,
        "last week: ",
        weekOfLastUpdatedDate
      );
      setIsAvailabilityUpdatedThisWeek(currentWeek === weekOfLastUpdatedDate);
    };

    isAvailUpdated();
  }, []);

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
      }}
    >
      <Box
        sx={{
          marginLeft: 2,
        }}
      >
        {isAvailabilityUpdatedThisWeek ? (
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 400,
              fontSize: 10,
              color: "#85CF27",
            }}
          >
            Completed
          </Typography>
        ) : (
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
        )}
        <Typography
          sx={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 18 }}
        >
          Availability Check-In
        </Typography>
        {isAvailabilityUpdatedThisWeek ? (
          <Typography
            sx={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 12 }}
          >
            Edit Your Weekly Availabilities
          </Typography>
        ) : (
          <Typography
            sx={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 12 }}
          >
            Mark Your Weekly Availabilities
          </Typography>
        )}
      </Box>
      {isAvailabilityUpdatedThisWeek ? (
        <CgCheckO
          size="45"
          style={{ marginTop: 10, marginRight: 20, color: "#85CF27" }}
        />
      ) : (
        <CgDanger
          size="45"
          style={{ marginTop: 10, marginRight: 20, color: "#FB4B4B" }}
        />
      )}
    </Box>
  );
};

export default AvailabilitiesCheckIn;
