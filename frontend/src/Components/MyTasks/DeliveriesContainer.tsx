import React, { useState } from "react";
import Delivery from "./Delivery";
import { TaskInterface } from "../../Contexts/Tasks";
import { FormGroup } from "@mui/material";

const DeliveriesContainer = (props: {
  dateFilter: string;
  completionFilter: string;
}) => {
  // will use context later on
  // const {tasks} = React.useContext(TaskContext) as TaskContextType;

  // use dummy data for now, and use Context when backend apis are ready.
  // dummyTasks holds tasks for 7 upcomming days including today.
  // NOTE: The following 7 upcoming days are just there for dummy data. Will be removed when using Context.

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

  const dummyTasks: TaskInterface[] = [
    {
      id: 1,
      date: day1,
      isCompleted: true,
      volunteer: "Leopold Bennett",
      deliveries: [],
    },
    {
      id: 2,
      date: day1,
      isCompleted: false,
      volunteer: "Avi Sharp",
      deliveries: [],
    },
    {
      id: 3,
      date: day1,
      isCompleted: true,
      volunteer: "Zahara Lott",
      deliveries: [],
    },
    {
      id: 4,
      date: day1,
      isCompleted: true,
      volunteer: "John Doe",
      deliveries: [],
    },
    {
      id: 5,
      date: day2,
      isCompleted: false,
      volunteer: "Jane Doe",
      deliveries: [],
    },
    {
      id: 6,
      date: day3,
      isCompleted: true,
      volunteer: "Thomas Walker",
      deliveries: [],
    },
    {
      id: 7,
      date: day3,
      isCompleted: false,
      volunteer: "William Maguire",
      deliveries: [],
    },
    {
      id: 8,
      date: day3,
      isCompleted: false,
      volunteer: "Tony McLennan",
      deliveries: [],
    },
    {
      id: 9,
      date: day4,
      isCompleted: false,
      volunteer: "Harry Park",
      deliveries: [],
    },
    {
      id: 10,
      date: day4,
      isCompleted: true,
      volunteer: "Christian D'Silva",
      deliveries: [],
    },
    {
      id: 11,
      date: day4,
      isCompleted: false,
      volunteer: "Joseph Kim",
      deliveries: [],
    },
    {
      id: 12,
      date: day5,
      isCompleted: false,
      volunteer: "Martin Brooks",
      deliveries: [],
    },
    {
      id: 13,
      date: day6,
      isCompleted: false,
      volunteer: "Emmanuel Tan",
      deliveries: [],
    },
    {
      id: 14,
      date: day7,
      isCompleted: false,
      volunteer: "Lionel Ronaldo",
      deliveries: [],
    },
    {
      id: 15,
      date: day7,
      isCompleted: false,
      volunteer: "Stephanie Han",
      deliveries: [],
    },
  ];
  
  // ---------------------------------- LINES BEFORE THIS WILL BE REMOVED LATER ON ---------------------------------------//

  // function that formats date to desired form: e.g. 8 Dec 2023
  const formatDate = (date: Date) => {
    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // filtering logic
  const dateFilteredTasks = dummyTasks.filter(
    (task) => formatDate(task.date) == props.dateFilter
  );
  let filteredTasks = dateFilteredTasks; // ALLTASKS filter
  if (props.completionFilter === "COMPLETED") {
    // if filter is set as COMPLETED, apply filter
    filteredTasks = dateFilteredTasks.filter((task) => task.isCompleted);
  } else if (props.completionFilter === "UPCOMING") {
    filteredTasks = dateFilteredTasks.filter((task) => !task.isCompleted);
  }

  return (
    <FormGroup sx={{ mr: "22px", ml: "22px", borderRadius: 3 }}>
      {/* {use dummy tasks for now} */}
      {filteredTasks.map((task: TaskInterface) => {
        return <Delivery task={task} key={task.id} />;
      })}
    </FormGroup>
  );
};

export default DeliveriesContainer;
