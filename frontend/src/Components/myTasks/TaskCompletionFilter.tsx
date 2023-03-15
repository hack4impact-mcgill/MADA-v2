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

const TaskCompletionFilter = (props: { updateCompletionFilter: Function }) => {
  // will use context later on
  // const {tasks} = React.useContext(TaskContext) as TaskContextType;
  const [taskCompletionType, setTaskCompletionType] = useState(
    TaskCompletionOption.AllTasks as string
  );

  const taskCompletionChangeHandler = (event: SelectChangeEvent<string>) => {
    setTaskCompletionType(event.target.value);
    props.updateCompletionFilter(event.target.value);
    console.log("completion option changed", event.target.value);
  };

  return (
    <FormControl sx={{ width: 125 }}>
      <InputLabel id="task-completion-select-label">
        Completion Filter
      </InputLabel>
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
