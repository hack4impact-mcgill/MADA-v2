import React, { useState } from "react";
import { useContext } from "react";
import Delivery from "./Delivery";
import {
  TaskContext,
  TaskInterface,
  MealDeliveryInterface,
} from "../../Contexts/Tasks";
import { TaskCompletionOption } from "./TaskCompletionFilter";
import { FormGroup } from "@mui/material";

const DeliveriesContainer = (props: {
  dateFilter: string;
  completionFilter: string;
}) => {
  const tasksContext = useContext(TaskContext); // fetchedTasks is an object with tasks array as a field.
  const fetchedTasks = tasksContext?.tasks;
  // May 9: Now we assume one task per day, no more, no less. IMPORTANT ASSUMPTION.

  // function that formats date to desired form: e.g. 8 Dec 2023
  const formatDate = (date: Date) => {
    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // function passed to sort function to sort deliveries based on routePosition
  const compareDeliveries = (
    delivery1: MealDeliveryInterface,
    delivery2: MealDeliveryInterface
  ) => {
    if (delivery1.routePosition < delivery2.routePosition) {
      return -1;
    } else if (delivery1.routePosition > delivery2.routePosition) {
      return 1;
    }
    return 0;
  };

  let oneDayTask: TaskInterface | null = null; // will be selected date's task

  // filtering based on date
  if (fetchedTasks) {
    console.log("in deliveriesContainter ", fetchedTasks); //fetchedTasks.tasks
    // we now assume that there is only one task associated to one date.
    for (let task of fetchedTasks) {
      console.log(
        "date filtering now: ",
        formatDate(new Date(task.date)),
        props.dateFilter
      );
      if (task.date && formatDate(new Date(task.date)) == props.dateFilter) {
        oneDayTask = task; // filter the task
        break;
      }
    }
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
