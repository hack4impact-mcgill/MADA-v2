import React, { useState } from "react";
import { useContext } from "react";
import Delivery from "./Delivery";
import {
  TaskContext,
  TaskInterface,
  MealDeliveryInterface,
} from "../../Contexts/Tasks";
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
      id: 4,
      date: day1,
      isCompleted: true,
      volunteer: "",
      deliveries: [
        {
          id: 1,
          isCompleted: false,
          routePosition: 0,
          mealType: "",
          program: "",
          task: {},
          client: {
            id: 1,
            name: "John Doe",
            email: "",
            address: "",
            mealType: "",
            sts: false,
            map: false,
          },
        },
        {
          id: 2,
          isCompleted: false,
          routePosition: 0,
          mealType: "",
          program: "",
          task: {},
          client: {
            id: 1,
            name: "Melissa Mallorca",
            email: "",
            address: "",
            mealType: "",
            sts: false,
            map: false,
          },
        },
        {
          id: 3,
          isCompleted: false,
          routePosition: 0,
          mealType: "",
          program: "",
          task: {},
          client: {
            id: 1,
            name: "Avi Sharp",
            email: "",
            address: "",
            mealType: "",
            sts: false,
            map: false,
          },
        },
      ],
    },
    {
      id: 5,
      date: day2,
      isCompleted: false,
      volunteer: "",
      deliveries: [
        {
          id: 1,
          isCompleted: false,
          routePosition: 0,
          mealType: "",
          program: "",
          task: {},
          client: {
            id: 1,
            name: "Real Madrid",
            email: "",
            address: "",
            mealType: "",
            sts: false,
            map: false,
          },
        },
      ],
    },
    {
      id: 8,
      date: day3,
      isCompleted: false,
      volunteer: "",
      deliveries: [
        {
          id: 1,
          isCompleted: false,
          routePosition: 0,
          mealType: "",
          program: "",
          task: {},
          client: {
            id: 1,
            name: "Inter Milan",
            email: "",
            address: "",
            mealType: "",
            sts: false,
            map: false,
          },
        },
        {
          id: 2,
          isCompleted: false,
          routePosition: 0,
          mealType: "",
          program: "",
          task: {},
          client: {
            id: 1,
            name: "Man City",
            email: "",
            address: "",
            mealType: "",
            sts: false,
            map: false,
          },
        },
      ],
    },
    {
      id: 10,
      date: day4,
      isCompleted: true,
      volunteer: "",
      deliveries: [
        {
          id: 1,
          isCompleted: false,
          routePosition: 0,
          mealType: "",
          program: "",
          task: {},
          client: {
            id: 1,
            name: "Jane Doe",
            email: "",
            address: "",
            mealType: "",
            sts: false,
            map: false,
          },
        },
      ],
    },
    {
      id: 12,
      date: day5,
      isCompleted: false,
      volunteer: "",
      deliveries: [],
    },
    {
      id: 13,
      date: day6,
      isCompleted: false,
      volunteer: "",
      deliveries: [],
    },
    {
      id: 15,
      date: day7,
      isCompleted: false,
      volunteer: "",
      deliveries: [],
    },
  ];
  // ---------------------------------- LINES BEFORE THIS WILL BE REMOVED LATER ON ---------------------------------------//

  const tasksContext = useContext(TaskContext); // fetchedTasks is an object with tasks array as a field.
  const fetchedTasks = tasksContext?.tasks;
  // const fetchedTasks = dummyTasks;
  // May 9: Now we assume one task per day, no more, no less.

  // function that formats date to desired form: e.g. 8 Dec 2023
  const formatDate = (date: Date) => {
    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // if (fetchedTasks) {
  //   // filtering logic
  //   console.log("in deliveriesContainter ", fetchedTasks.tasks);
  //   const dateFilteredTasks = fetchedTasks.tasks.filter(
  //     (task) => formatDate(task.date) != props.dateFilter
  //   );
  //   console.log(dateFilteredTasks);
  //   console.log("date filter from props", props.dateFilter);
  //   filteredTasks = dateFilteredTasks; // ALLTASKS filter
  //   if (props.completionFilter === "COMPLETED") {
  //     // if filter is set as COMPLETED, apply filter
  //     filteredTasks = dateFilteredTasks.filter((task) => task.isCompleted);
  //   } else if (props.completionFilter === "UPCOMING") {
  //     filteredTasks = dateFilteredTasks.filter((task) => !task.isCompleted);
  //   }
  // }

  let oneDayTask = null; // will be selected date's task

  if (fetchedTasks) {
    // filtering logic
    console.log("in deliveriesContainter ", fetchedTasks); //fetchedTasks.tasks
    // we now assume that there is only one task associated to one date.
    for (let task of fetchedTasks) {
      // fetchedTasks.tasks
      if (task.date && formatDate(task.date) == props.dateFilter) {
        oneDayTask = task; // filter the task
        break;
      } else { // temporary!!!
        oneDayTask = task; // temporary!!!
        break; // temporary!!!
      }
    }
  }

  let filteredDeliveries: MealDeliveryInterface[] = [];

  if (oneDayTask) {
    filteredDeliveries = oneDayTask.deliveries;
  }

  console.log(filteredDeliveries);

  return (
    <FormGroup sx={{ mr: "22px", ml: "22px", borderRadius: 3 }}>
      {/* {use dummy tasks for now} */}
      {filteredDeliveries.map((mealDelivery: MealDeliveryInterface) => {
        return <Delivery delivery={mealDelivery} key={mealDelivery.id} />;
      })}
    </FormGroup>
  );
};

export default DeliveriesContainer;
