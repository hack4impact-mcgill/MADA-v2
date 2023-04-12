import React from "react";
import { Box, Typography } from "@mui/material";
import SingleDayTasksContainer from "./SingleDayTasksContainer";
import { useState, useEffect } from "react";

// ------------------------- LINES AFTER THIS WILL BE REMOVED LATER WHEN BACKEND WORKS -----------------------------//
const day1 = new Date("2023-04-13T00:00:00Z");
const day2 = new Date("2023-04-14T00:00:00Z");
const day3 = new Date("2023-04-15T00:00:00Z");
const day4 = new Date("2023-04-16T00:00:00Z");
const day5 = new Date("2023-04-17T00:00:00Z");
const day6 = new Date("2023-04-18T00:00:00Z");
const day7 = new Date("2023-04-19T00:00:00Z");

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

// Would have been better if we could just request backend API 
// to just query tasks within the range of dates... :D

// Getting All Tasks Algorithm choice:
// First Method:
// 1. Get All Tasks from a single user (will be an array of all tasks from a user)
// 2. Go through that tasks array and for each task, if that task's deliveryTime is 
//    within the range of dates (startDate ~ endDate) store it in another array
// 3. Sort the new array with the tasks that are within the desired range of dates.
// 
// Second Method:
// 1. Get ONLY Tasks that are within the desired range of dates from the backend database.
// 2. Sort in frontend
// ---------------------------------- LINES BEFORE THIS WILL BE REMOVED LATER ON ---------------------------------------//

const HistoryTasksContainer = (props: {
  startDate: Date | null;
  endDate: Date | null;
}) => {
  // startdate and enddate can be null, if no dates are chosen.
  const [historyTasks, setHistoryTasks] = useState(dummyTasks.filter(task => {
    // filter out tasks that don't fall within the selected date range
    return (props.startDate === null || task.deliveryTime >= props.startDate) &&
           (props.endDate === null || task.deliveryTime <= props.endDate)
  }));

  // get the range of dates for given start date and end date
  const getRangeOfDates = (startDate: Date | null, endDate: Date | null) => {
    if (startDate == null || endDate == null) {
      // if no dates were selected, do not return range of dates.
      return [];
    }
    const date = new Date(startDate);
    const currentDate = new Date(startDate);
    const rangeOfDates = [];

    let followingDay = new Date(currentDate);
    while (currentDate <= endDate) {
      rangeOfDates.push(followingDay);
      date.setDate(date.getDate() + 1); // get next date
      followingDay = new Date(date);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return rangeOfDates;
  };

  const [rangeOfDates, setRangeOfDates] = useState(
    getRangeOfDates(props.startDate, props.endDate)
  );

  useEffect(() => {
    // when startDate and endDate states change in the parent component, update the rangeOfDates that need to be displayed.
    setRangeOfDates(getRangeOfDates(props.startDate, props.endDate));

    // also update the historyTasks state by filtering out tasks that don't fall within the selected date range
    setHistoryTasks(dummyTasks.filter(task => {
      return (props.startDate === null || task.deliveryTime >= props.startDate) &&
             (props.endDate === null || task.deliveryTime <= props.endDate)
    }));
  }, [props.startDate, props.endDate]);

  return (
    <Box sx={{ ml: "14px", mr: "14px" }}>
      {/* when no proper date range is given, display help message. */}
      {!props.startDate || !props.endDate ? (
        <Box sx={{ mt: 3, textAlign: "center" }}>
          Please Select A Date Range To Filter Tasks.
        </Box>
      ) : null}
      {rangeOfDates.map((date: Date) => {
        return (
          <SingleDayTasksContainer
            date={date}
            historyTasks={historyTasks}
            key={date.toDateString()}
          />
        );
        {
          /* use date as key */
        }
      })}
    </Box>
  );
};

export default HistoryTasksContainer;
