import React, { useState } from "react";
import Delivery from "./Delivery";
import { TaskInterface } from "../../contexts/Tasks";
import { FormGroup } from "@mui/material";


const DeliveriesContainer = (props: { dateFilter : string}) => {
  // will use context later on
  // const {tasks} = React.useContext(TaskContext) as TaskContextType;

  // use dummy data for now, and use Context when backend apis are ready.
  // dummyTasks holds tasks for 7 upcomming days including today.
  const dummyTasks = [
    {
      id: 1,
      deliveryTime: new Date(2023, 2, 9),
      isCompleted: true,
      deliveries: {
        id: 1,
        quantity: 1,
        mealType: "meals a partager",
        task: undefined,
      },
    },
    {
      id: 2,
      deliveryTime: new Date(2023, 2, 9),
      isCompleted: false,
      deliveries: {
        id: 2,
        quantity: 1,
        mealType: "meals a partager",
        task: undefined,
      },
    },
    {
      id: 3,
      deliveryTime: new Date(2023, 2, 9),
      isCompleted: true,
      deliveries: {
        id: 3,
        quantity: 3,
        mealType: "meals a partager",
        task: undefined,
      },
    },
    {
      id: 4,
      deliveryTime: new Date(2023, 2, 10),
      isCompleted: true,
      deliveries: {
        id: 4,
        quantity: 2,
        mealType: "meals a partager",
        task: undefined,
      },
    },
    {
      id: 5,
      deliveryTime: new Date(2023, 2, 10),
      isCompleted: false,
      deliveries: {
        id: 5,
        quantity: 1,
        mealType: "meals a partager",
        task: undefined,
      },
    },
    {
      id: 6,
      deliveryTime: new Date(2023, 2, 11),
      isCompleted: true,
      deliveries: {
        id: 6,
        quantity: 3,
        mealType: "meals a partager",
        task: undefined,
      },
    },
    {
      id: 7,
      deliveryTime: new Date(2023, 2, 12),
      isCompleted: false,
      deliveries: {
        id: 7,
        quantity: 2,
        mealType: "meals a partager",
        task: undefined,
      },
    },
    {
      id: 8,
      deliveryTime: new Date(2023, 2, 14),
      isCompleted: true,
      deliveries: {
        id: 8,
        quantity: 6,
        mealType: "meals a partager",
        task: undefined,
      },
    },
  ];

  const [filteredTasks, setFilteredTasks] = useState(dummyTasks); // initialize with tasks Context later on!!

  // function that formats date to desired form: e.g. 8 Dec 2023
  const formatDate = (date: Date) => {
    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  console.log(props.dateFilter);
  const filTasks = dummyTasks.filter(task => formatDate(task.deliveryTime) == props.dateFilter); //filter !task.isCompleted for completion

  return (
    <FormGroup sx={{mr: "22px", ml: "22px", borderRadius: 3}}>
      {/* {use dummy tasks for now} */}
      {filTasks.map((task: TaskInterface) => {
        return <Delivery task={task} key={task.id}/>
      })}
    </FormGroup>
  );
};

export default DeliveriesContainer;


/* 
Dummy data used before

<Delivery
  isCompleted={false}
  deliveryTime={new Date()}
  name={"Leopold Bennett"}
></Delivery>
<Delivery
  isCompleted={false}
  deliveryTime={new Date()}
  name={"Avi Sharp"}
></Delivery>
<Delivery
  isCompleted={true}
  deliveryTime={new Date()}
  name={"Zahara Lott"}
></Delivery>
*/