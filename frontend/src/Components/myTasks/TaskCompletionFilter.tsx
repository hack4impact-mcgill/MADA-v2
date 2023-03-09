import React, { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { TaskInterface } from "../../contexts/Tasks";
import { CgEnter } from "react-icons/cg";

// use enum to define named constants used for filtering by task completion type
enum TaskCompletionOption {
  AllTasks = "ALLTASKS",
  Upcoming = "UPCOMING",
  Completed = "COMPLETED",
}

const TaskCompletionFilter = (props: {}) => {
  // will use context later on
  // const {tasks} = React.useContext(TaskContext) as TaskContextType;
  const [taskCompletionType, setTaskCompletionType] = useState(TaskCompletionOption.AllTasks as string);

  const taskCompletionChangeHandler = (event: SelectChangeEvent<string>) => {
    console.log("completion option changed", event.target.value);
    setTaskCompletionType(event.target.value);
  };

// question: Is "upcoming" filter really needed? It can be confusing to apply Date filter and Completion Filter at the same time.
// For example, what happens if the user puts date filter as "14 Mar 2023" and also applys "upcoming" filter?
// I feel like it would be much less confusing to remove "upcoming" filter option and just have "All Tasks" and "Completed" for completion filter. 
// After all, users can easily see upcoming tasks for upcoming days by changing dates using date Filter.

  // //implements filtering logic
  // const filterTasks = (taskCompletionType: TaskCompletionOption): TaskInterface[] {
  //   // returned value will be an array of TaskInterface
  //   switch (taskCompletionType) {
  //     case TaskCompletionOption.AllTasks:
  //       return tasks;
  //     case TaskCompletionOption.Upcoming:
  //       return tasks.filter(task => !task.isCompleted && task.deliveryTime > new Date()); // return all tasks within next 7 days
  //     case TaskCompletionOption.Completed:
  //       return tasks.filter(task => task.isCompleted);
  //     default:
  //       throw new Error(`Invalid task completion option: ${taskCompletionType}`);
  //   }
  // }
  
  return (
    <FormControl sx={{ width: 125 }}>
      <InputLabel id="task-completion-select-label">Completion Filter</InputLabel>
      <Select
        labelId="task-completion-select-label"
        id="task-copmletion-select"
        label={taskCompletionType}
        value={taskCompletionType}
        className="select"
        onChange={taskCompletionChangeHandler}
        sx={{
          bgcolor: "#FFFFFF",
          borderRadius: "10px",
          boxShadow: "none",
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
          height: 50,
        }}
      >
        <MenuItem value={TaskCompletionOption.AllTasks}>All Tasks</MenuItem>
        <MenuItem value={TaskCompletionOption.Upcoming}>Upcoming</MenuItem>
        <MenuItem value={TaskCompletionOption.Completed}>Completed</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TaskCompletionFilter;
