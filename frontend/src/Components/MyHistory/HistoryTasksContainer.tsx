import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import SingleDayTasksContainer from "./SingleDayTasksContainer";
import { getAllTasks } from "../../services";
import { TaskInterface } from "../../Contexts/Tasks";

const HistoryTasksContainer = (props: {
  startDate: Date | null;
  endDate: Date | null;
}) => {
  const [allTasks, setAllTasks] = useState<TaskInterface[]>([]);
  const [rangeOfDates, setRangeOfDates] = useState<Date[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getAllTasks(); // Fetch tasks from the backend
        setAllTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  console.log(allTasks);
  console.log("Type of", typeof allTasks)

  const getRangeOfDates = (startDate: Date | null, endDate: Date | null) => {
    if (!startDate || !endDate) {
      return [];
    }

    const rangeOfDates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      rangeOfDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return rangeOfDates;
  };

  useEffect(() => {
    setRangeOfDates(getRangeOfDates(props.startDate, props.endDate));
  }, [props.startDate, props.endDate]);
  
  useEffect(() => {
    const filteredTasks = [];
    
    for (let i = 0; i < allTasks.length; i++) {
      const task = allTasks[i];
      const taskDate = new Date(task.deliveryTime); // Assuming each task has a 'deliveryTime' property
      console.log("Task Date", taskDate);
      if (
        props.startDate &&
        props.endDate &&
        taskDate >= props.startDate &&
        taskDate <= props.endDate
      ) {
        filteredTasks.push(task);
      }
    }

    console.log("filteredTasks", filteredTasks);
  }, [allTasks, props.startDate, props.endDate]);

  return (
    <Box sx={{ ml: "14px", mr: "14px" }}>
      {!props.startDate || !props.endDate ? (
        <Box sx={{ mt: 3, textAlign: "center" }}>
          Please Select A Date Range To Filter Tasks.
        </Box>
      ) : null}
      {rangeOfDates.map((date: Date) => (
        <SingleDayTasksContainer
          date={date}
          historyTasks={[]}
          key={date.toDateString()}
        />
      ))}
    </Box>
  );
};

export default HistoryTasksContainer;