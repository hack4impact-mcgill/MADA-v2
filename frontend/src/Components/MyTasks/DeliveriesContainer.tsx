import React, { useState } from "react";
import { useContext } from "react";
import Delivery from "./Delivery";
import {
  TaskContext,
  TaskInterface,
  MealDeliveryInterface,
} from "../../Contexts/Tasks";
import { DateContext } from "../../Contexts/Date";
import { TaskCompletionOption } from "./TaskCompletionFilter";
import { FormGroup } from "@mui/material";

const DeliveriesContainer = (props: {
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
      volunteer: {
        id: 1,
        name: "Leopold Bennett",
        startDate: day1,
        profilePicture: "<profile picture URL>",
        availabilities: [],
        password: "<password>",
        token: "<token>",
        email: "<email>",
        phoneNumber: "<phone number>"
      },
      deliveries: [],
    },
    {
      id: 2,
      date: day1,
      isCompleted: false,
      volunteer: {
        id: 2,
        name: "Avi Sharp",
        startDate: day1,
        profilePicture: "<profile picture URL>",
        availabilities: [],
        password: "<password>",
        token: "<token>",
        email: "<email>",
        phoneNumber: "<phone number>"
      },
      deliveries: [],
    },
    {
      id: 3,
      date: day1,
      isCompleted: true,
      volunteer: {
        id: 3,
        name: "Zahara Lott",
        startDate: day1,
        profilePicture: "<profile picture URL>",
        availabilities: [],
        password: "<password>",
        token: "<token>",
        email: "<email>",
        phoneNumber: "<phone number>"
      },
      deliveries: [],
    },
    {
      id: 4,
      date: day1,
      isCompleted: true,
      volunteer: {
        id: 4,
        name: "John Doe",
        startDate: day1,
        profilePicture: "<profile picture URL>",
        availabilities: [],
        password: "<password>",
        token: "<token>",
        email: "<email>",
        phoneNumber: "<phone number>"
      },
      deliveries: [],
    },
    {
      id: 5,
      date: day2,
      isCompleted: false,
      volunteer: {
        id: 5,
        name: "Jane Doe",
        startDate: day2,
        profilePicture: "<profile picture URL>",
        availabilities: [],
        password: "<password>",
        token: "<token>",
        email: "<email>",
        phoneNumber: "<phone number>"
      },
      deliveries: [],
    },
    {
      id: 6,
      date: day3,
      isCompleted: true,
      volunteer: {
        id: 6,
        name: "Thomas Walker",
        startDate: day3,
        profilePicture: "<profile picture URL>",
        availabilities: [],
        password: "<password>",
        token: "<token>",
        email: "<email>",
        phoneNumber: "<phone number>"
      },
      deliveries: [],
    },
    {
      id: 7,
      date: day3,
      isCompleted: false,
      volunteer: {
        id: 7,
        name: "William Maguire",
        startDate: day3,
        profilePicture: "<profile picture URL>",
        availabilities: [],
        password: "<password>",
        token: "<token>",
        email: "<email>",
        phoneNumber: "<phone number>"
      },
      deliveries: [],
    },
    {
      id: 8,
      date: day3,
      isCompleted: false,
      volunteer: {
        id: 8,
        name: "Tony McLennan",
        startDate: day3,
        profilePicture: "<profile picture URL>",
        availabilities: [],
        password: "<password>",
        token: "<token>",
        email: "<email>",
        phoneNumber: "<phone number>"
      },
      deliveries: [],
    },
    {
      id: 9,
      date: day4,
      isCompleted: false,
      volunteer: {
        id: 9,
        name: "Harry Park",
        startDate: day4,
        profilePicture: "<profile picture URL>",
        availabilities: [],
        password: "<password>",
        token: "<token>",
        email: "<email>",
        phoneNumber: "<phone number>"
      },
      deliveries: [],
    },
    {
      id: 10,
      date: day4,
      isCompleted: true,
      volunteer: {
        id: 10,
        name: "Christian D'Silva",
        startDate: day4,
        profilePicture: "<profile picture URL>",
        availabilities: [],
        password: "<password>",
        token: "<token>",
        email: "<email>",
        phoneNumber: "<phone number>"
      },
      deliveries: [],
    },
    {
      id: 11,
      date: day4,
      isCompleted: false,
      volunteer: {
        id: 11,
        name: "Joseph Kim",
        startDate: day4,
        profilePicture: "<profile picture URL>",
        availabilities: [],
        password: "<password>",
        token: "<token>",
        email: "<email>",
        phoneNumber: "<phone number>"
      },
      deliveries: [],
    },
    {
      id: 12,
      date: day5,
      isCompleted: false,
      volunteer: {
        id: 12,
        name: "Martin Brooks",
        startDate: day5,
        profilePicture: "<profile picture URL>",
        availabilities: [],
        password: "<password>",
        token: "<token>",
        email: "<email>",
        phoneNumber: "<phone number>"
      },
      deliveries: [],
    },
    {
      id: 13,
      date: day6,
      isCompleted: false,
      volunteer: {
        id: 13,
        name: "Emmanuel Tan",
        startDate: day6,
        profilePicture: "<profile picture URL>",
        availabilities: [],
        password: "<password>",
        token: "<token>",
        email: "<email>",
        phoneNumber: "<phone number>"
      },
      deliveries: [],
    },
    {
      id: 14,
      date: day7,
      isCompleted: false,
      volunteer: {
        id: 14,
        name: "Lionel Ronaldo",
        startDate: day7,
        profilePicture: "<profile picture URL>",
        availabilities: [],
        password: "<password>",
        token: "<token>",
        email: "<email>",
        phoneNumber: "<phone number>"
      },
      deliveries: [],
    },
    {
      id: 15,
      date: day7,
      isCompleted: false,
      volunteer: {
        id: 15,
        name: "Stephanie Han",
        startDate: day7,
        profilePicture: "<profile picture URL>",
        availabilities: [],
        password: "<password>",
        token: "<token>",
        email: "<email>",
        phoneNumber: "<phone number>"
      },
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

  let filteredDeliveries: MealDeliveryInterface[] = [];

  // filtering based on completion
  if (oneDayTask) {
    // only if there is a task assigned for the current day
    filteredDeliveries = oneDayTask.deliveries; // ALLDELIVERIES filter by default
    if (props.completionFilter === TaskCompletionOption.Completed) {
      // if filter is set as COMPLETED, apply filter
      filteredDeliveries = oneDayTask.deliveries.filter(
        (delivery) => delivery.isCompleted
      );
    } else if (props.completionFilter === TaskCompletionOption.Upcoming) {
      // if filter is set as UPCOMING, apply filter
      filteredDeliveries = oneDayTask.deliveries.filter(
        (delivery) => !delivery.isCompleted
      );
    }
  }

  console.log(
    "filtered deliveries for selected date, without sorting: ",
    filteredDeliveries
  );

  // sort deliveries
  filteredDeliveries.sort(compareDeliveries);

  console.log("sorted deliveries", filteredDeliveries);

  return (
    <FormGroup sx={{ mr: "22px", ml: "22px", borderRadius: 3 }}>
      {filteredDeliveries.map((mealDelivery: MealDeliveryInterface) => {
        return (
          <Delivery
            task={oneDayTask}
            delivery={mealDelivery}
            key={mealDelivery.id}
          />
        );
      })}
    </FormGroup>
  );
};

export default DeliveriesContainer;
