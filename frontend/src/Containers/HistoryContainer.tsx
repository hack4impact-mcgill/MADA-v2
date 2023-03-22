import React from "react";
import { Box, Typography } from "@mui/material";
import CloseButton from "../Components/MyHistory/CloseButton";
import DateRangeFilterContainer from "../Components/MyHistory/DateRangeFilterContainer";
import HistoryTasksContainer from "../Components/MyHistory/HistoryTasksContainer";
import { useState } from "react";

const HistoryContainer = () => {
  const [oldTasks, setOldTasks] = useState();


  // ------------------------- LINES AFTER THIS WILL BE REMOVED LATER WHEN BACKEND WORKS -----------------------------//
  const date = new Date(); // date variable is used to get the following 6 days.
  const day1 = new Date();
  date.setDate(day1.getDate() + 1);
  const day2 = new Date(date);
  date.setDate(day1.getDate() + 2);
  const day3 = new Date(date);
  date.setDate(day1.getDate() + 3);
  const day4 = new Date(date);
  date.setDate(day1.getDate() + 4);
  const day5 = new Date(date);
  date.setDate(day1.getDate() + 5);
  const day6 = new Date(date);
  date.setDate(day1.getDate() + 6);
  const day7 = new Date(date);

  const dummyTasks = [
    {
      id: 1,
      deliveryTime: day1,
      isCompleted: true,
      name: "Leopold Bennett",
      deliveries: [],
    },
    {
      id: 2,
      deliveryTime: day1,
      isCompleted: false,
      name: "Avi Sharp",
      deliveries: [],
    },
    {
      id: 3,
      deliveryTime: day1,
      isCompleted: true,
      name: "Zahara Lott",
      deliveries: [],
    },
    {
      id: 4,
      deliveryTime: day1,
      isCompleted: true,
      name: "John Doe",
      deliveries: [],
    },
    {
      id: 5,
      deliveryTime: day2,
      isCompleted: false,
      name: "Jane Doe",
      deliveries: [],
    },
    {
      id: 6,
      deliveryTime: day3,
      isCompleted: true,
      name: "Thomas Walker",
      deliveries: [],
    },
    {
      id: 7,
      deliveryTime: day3,
      isCompleted: false,
      name: "William Maguire",
      deliveries: [],
    },
    {
      id: 8,
      deliveryTime: day3,
      isCompleted: false,
      name: "Tony McLennan",
      deliveries: [],
    },
    {
      id: 9,
      deliveryTime: day4,
      isCompleted: false,
      name: "Harry Park",
      deliveries: [],
    },
    {
      id: 10,
      deliveryTime: day4,
      isCompleted: true,
      name: "Christian D'Silva",
      deliveries: [],
    },
    {
      id: 11,
      deliveryTime: day4,
      isCompleted: false,
      name: "Joseph Kim",
      deliveries: [],
    },
    {
      id: 12,
      deliveryTime: day5,
      isCompleted: false,
      name: "Martin Brooks",
      deliveries: [],
    },
    {
      id: 13,
      deliveryTime: day6,
      isCompleted: false,
      name: "Emmanuel Tan",
      deliveries: [],
    },
    {
      id: 14,
      deliveryTime: day7,
      isCompleted: false,
      name: "Lionel Ronaldo",
      deliveries: [],
    },
    {
      id: 15,
      deliveryTime: day7,
      isCompleted: false,
      name: "Stephanie Han",
      deliveries: [],
    },
  ];
  // ---------------------------------- LINES BEFORE THIS WILL BE REMOVED LATER ON ---------------------------------------//

  return (
    <Box
      sx={{
        margin: 0,
        fontFamily: "Poppins",
        bgcolor: "#FAF9F9",
        width: "100%",
        height: "100%",
      }}
    >
      <CloseButton />
      <DateRangeFilterContainer />
      <HistoryTasksContainer />
    </Box>
  );
};

export default HistoryContainer;
