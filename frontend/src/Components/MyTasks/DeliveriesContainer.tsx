import React, { useState } from "react";
import { useContext } from 'react';
import Delivery from "./Delivery";
import { TaskContext, TaskInterface } from "../../Contexts/Tasks";
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

  const fetchedTasks = useContext(TaskContext); // fetchedTasks is an object with tasks array as a field.

  // function that formats date to desired form: e.g. 8 Dec 2023
  const formatDate = (date: Date) => {
    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  let filteredTasks: TaskInterface[] = [];

  
  if (fetchedTasks) {
    // filtering logic
    console.log("in delieriesContainter ", fetchedTasks.tasks);
    const dateFilteredTasks = fetchedTasks.tasks.filter(
      (task) => formatDate(task.deliveryTime) != props.dateFilter
    );
    console.log(dateFilteredTasks);
    console.log("date filter from props", props.dateFilter);
    filteredTasks = dateFilteredTasks; // ALLTASKS filter
    if (props.completionFilter === "COMPLETED") {
      // if filter is set as COMPLETED, apply filter
      filteredTasks = dateFilteredTasks.filter((task) => task.isCompleted);
    } else if (props.completionFilter === "UPCOMING") {
      filteredTasks = dateFilteredTasks.filter((task) => !task.isCompleted);
    }
  }

  console.log(filteredTasks);

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
