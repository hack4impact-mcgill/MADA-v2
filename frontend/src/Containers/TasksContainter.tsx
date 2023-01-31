import React from "react";
import Delivery from "../Components/myTasks/Delivery";
import './TasksContainer.css';

const TasksContainer = () => {
  return (
    <div className="tasks-container">
      Hello this is the tasks page
      <Delivery isCompleted={true} deliveryTime={new Date()} name={'Jane Doe'}></Delivery>
      <Delivery isCompleted={false} deliveryTime={new Date()} name={'Leopold Bennett'}></Delivery>
      <Delivery isCompleted={true} deliveryTime={new Date()} name={'Avi Sharp'}></Delivery>
      <Delivery isCompleted={true} deliveryTime={new Date()} name={'Zahara Lott'}></Delivery>
    </div>
  );
};

export default TasksContainer;
