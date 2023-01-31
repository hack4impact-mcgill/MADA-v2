import React from "react";
import Deliveries from '../Components/myTasks/Deliveries';
import './TasksContainer.css';

const TasksContainer = () => {
  return (
    <div className="tasks-container">
      Hello this is the tasks page
      <Deliveries/>
    </div>
  );
};

export default TasksContainer;
