import React, { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import SingleDayTasksContainer from "./SingleDayTasksContainer";
import { getAllTasks } from "../../services";
import { TaskContext, TaskInterface } from "../../Contexts/Tasks";
import { getCurrentUserId } from "../../helper";

const HistoryTasksContainer = (props: {
  startDate: Date | null;
  endDate: Date | null;
}) => {
  const [allTasks, setAllTasks] = useState<{ [date: string]: TaskInterface[] }>({});
  const [rangeOfDates, setRangeOfDates] = useState<Date[]>([]);
  const user = Number(getCurrentUserId());
  const tasksContext = useContext(TaskContext);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getAllTasks(); // Fetch tasks from the backend
        const tasks = response;

        console.log("initialtasks", tasks);

        const tasksByDate: { [date: string]: TaskInterface[] } = {};

        tasks.forEach((task: TaskInterface) => {
          if (task.volunteer?.id === user) {
            const date = convertDate(new Date(task.date)).join('-'); // convert to string format "YYYY-MM-DD"
            if (!tasksByDate[date]) {
              tasksByDate[date] = [];
            }
            tasksByDate[date].push(task);
          }
        });

        setAllTasks(tasksByDate);

        // Update the tasksContext with the fetched tasks
        tasksContext?.setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array to run only once on mount

  console.log("allTasks", allTasks);

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

  console.log("RANGEOFDATES", rangeOfDates);

  function convertDate(input: Date): number[] {
    // JavaScript months are 0-indexed, so we need to add 1 to get the correct month number.
    const year = input.getFullYear();
    const month = input.getMonth() + 1;
    const day = input.getDate();

    return [year, month, day];
  }

  useEffect(() => {
    setRangeOfDates(getRangeOfDates(props.startDate, props.endDate));
  }, [props.startDate, props.endDate]);

  return (
    <Box sx={{ ml: "14px", mr: "14px" }}>
      {!props.startDate || !props.endDate ? (
        <Box sx={{ mt: 3, textAlign: "center" }}>
          Please Select A Date Range To Filter Tasks.
        </Box>
      ) : null}
      {rangeOfDates.map((date: Date) => {
        const dateString = convertDate(date).join('-');
        return (
          <SingleDayTasksContainer
            date={date}
            historyTasks={allTasks[dateString] || []}  // Use dateString as the key
            key={dateString}
          />
        );
      })}
    </Box>
  );
};

export default HistoryTasksContainer;
