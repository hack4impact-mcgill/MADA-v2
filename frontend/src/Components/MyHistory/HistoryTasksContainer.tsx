import React from "react";
import { Box, Typography } from "@mui/material";
import SingleDayTasksContainer from "./SingleDayTasksContainer";
import { useState } from "react";

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

const HistoryTasksContainer = (props: { startDate : Date, endDate : Date}) => {
  const [historyTasks, setHistoryTasks] = useState(dummyTasks);

  // get the range of dates for given start date and end date
  // needs to be fixed
  const getRangeOfDates = (startDate : Date, endDate : Date) => {
    const date = new Date(); 
    const currentDate = new Date(startDate);
    const rangeOfDates = [];
    while (currentDate <= endDate) {
      date.setDate(date.getDate() + 1); // get next date
      const followingDay = new Date(date);
      rangeOfDates.push(followingDay);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return rangeOfDates;
  }

  const [rangeOfDates, setRangeOfDates] = useState(getRangeOfDates(props.startDate, props.endDate));
  

  return (
    <Box sx={{ ml : "14px", mr: "14px" }}>
      {rangeOfDates.map((date : Date) => {
        return <SingleDayTasksContainer date={date} historyTasks={historyTasks} key={date.toDateString()}/> 
        {/* use date as key */}
      })}
    </Box>
  );
};

export default HistoryTasksContainer;
