import React from "react";
import Delivery from "./Delivery";
import { TaskInterface } from "../../contexts/Tasks";
import { FormGroup } from "@mui/material";


const DeliveriesContainer = () => {
  // will use context later on
  // const {tasks} = React.useContext(TaskContext) as TaskContextType;
  const dummyTasks = [{
    id:1,
    deliveryTime: new Date(),
    isCompleted:true,
    deliveries: {id:1,quantity:1,mealType:"meals a partager", task: undefined}
  },
  {
    id:2,
    deliveryTime: new Date(),
    isCompleted:false,
    deliveries: {id:2,quantity:1,mealType:"meals a partager", task: undefined}
  },
  {
    id:3,
    deliveryTime: new Date(),
    isCompleted:true,
    deliveries: {id:3,quantity:3,mealType:"meals a partager", task: undefined}
  },
  {
    id:4,
    deliveryTime: new Date(),
    isCompleted:true,
    deliveries: {id:4,quantity:2,mealType:"meals a partager", task: undefined}
  }]
  return (
    <FormGroup sx={{mr: "22px", ml: "22px", borderRadius: 3}}>
      {/* {use dummy tasks for now} */}
      {dummyTasks.map((task: TaskInterface) => {
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