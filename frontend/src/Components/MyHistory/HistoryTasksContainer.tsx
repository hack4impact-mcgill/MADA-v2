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
    date: day1,
    isCompleted: true,
    name: "Leopold Bennett",
    volunteer: null,
    deliveries: [],
  },
  {
    id: 2,
    date: day1,
    isCompleted: false,
    name: "Avi Sharp",
    volunteer: null,
    deliveries: [],
  },
  {
    id: 3,
    date: day1,
    isCompleted: true,
    name: "Zahara Lott",
    volunteer: null,
    deliveries: [],
  },
  {
    id: 4,
    date: day1,
    isCompleted: true,
    name: "John Doe",
    volunteer: null,
    deliveries: [],
  },
  {
    id: 5,
    date: day2,
    isCompleted: false,
    name: "Jane Doe",
    volunteer: null,
    deliveries: [],
  },
  {
    id: 6,
    date: day3,
    isCompleted: true,
    name: "Thomas Walker",
    volunteer: null,
    deliveries: [],
  },
  {
    id: 7,
    date: day3,
    isCompleted: false,
    name: "William Maguire",
    volunteer: null,
    deliveries: [],
  },
  {
    id: 8,
    date: day3,
    isCompleted: false,
    name: "Tony McLennan",
    volunteer: null,
    deliveries: [],
  },
  {
    id: 9,
    date: day4,
    isCompleted: false,
    name: "Harry Park",
    volunteer: null,
    deliveries: [],
  },
  {
    id: 10,
    date: day4,
    isCompleted: true,
    name: "Christian D'Silva",
    volunteer: null,
    deliveries: [],
  },
  {
    id: 11,
    date: day4,
    isCompleted: false,
    name: "Joseph Kim",
    volunteer: null,
    deliveries: [],
  },
  {
    id: 12,
    date: day5,
    isCompleted: false,
    name: "Martin Brooks",
    volunteer: null,
    deliveries: [],
  },
  {
    id: 13,
    date: day6,
    isCompleted: false,
    name: "Emmanuel Tan",
    volunteer: null,
    deliveries: [],
  },
  {
    id: 14,
    date: day7,
    isCompleted: false,
    name: "Lionel Ronaldo",
    volunteer: null,
    deliveries: [],
  },
  {
    id: 15,
    date: day7,
    isCompleted: false,
    name: "Stephanie Han",
    volunteer: null,
    deliveries: [],
  },
];

// Would have been better if we could just request backend API 
// to just query tasks within the range of dates... :D

// Getting All Tasks Algorithm choice:
// First Method:
// 1. Get All Tasks from a single user (will be an array of all tasks from a user)
// 2. Go through that tasks array and for each task, if that task's date is 
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
    return (props.startDate === null || task.date >= props.startDate) &&
           (props.endDate === null || task.date <= props.endDate)
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
      return (props.startDate === null || task.date >= props.startDate) &&
             (props.endDate === null || task.date <= props.endDate)
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
