import React from "react";
import { Box, FormControlLabel, Checkbox, Typography } from "@mui/material";
import DeliveryLabel from "./DeliveryLabel";
import {
  TaskContext,
  TaskContextType,
  TaskInterface,
  MealDeliveryInterface
} from "../../Contexts/Tasks";
import { updateMealDelivery, updateTask } from "../../services";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const Delivery = (props: { task: TaskInterface | null, delivery: MealDeliveryInterface }) => {
  const { tasks, setTasks } = React.useContext(TaskContext) as TaskContextType;

  // handle delivery checkbox toggle
  // Not only mealDelivery has to be updated, but Task entity that has relationship with it must be
  // updated too!
  const onCheckToggle = async () => {
    // !props.task.isCompleted will toggle the checkbox state
    const updatedDelivery = await updateMealDelivery({...props.delivery, isCompleted: !props.delivery.isCompleted} as MealDeliveryInterface);
    console.log("updated isCompleted in delivery: ",updatedDelivery);
    const updatedTask = await updateTask({...props.task, delivery: updatedDelivery} as TaskInterface)
    console.log("updated Task as well as delivery! ", updatedTask);

    // // instead of fetching the whole updated tasks to set context, set context just by changing the only updated task
    // const taskIndex = tasks.findIndex(task => task.id === props.delivery.id)
    // const updatedTasks = [...tasks.slice(0, taskIndex), updatedTask, ...tasks.slice(taskIndex + 1)];
    // setTasks(updatedTasks); // update context
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "Poppins",
        bgcolor: !props.delivery.isCompleted ? "#FFFFFF" : "#DFDFDF",
        opacity: !props.delivery.isCompleted ? 1 : 0.7,
        height: 99,
        width: "100%",
        mb: 1,
        borderRadius: 2,
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 40 },
              ml: 2,
              "&.Mui-checked": {
                color: "white",
              },
            }}
            checked={props.delivery.isCompleted} /*onChange*/
            onChange={onCheckToggle}
          />
        }
        label={
          <DeliveryLabel
            isCompleted={props.delivery.isCompleted}
            // deliveryTime={props.delivery.date}
            name={props.delivery.client.name} // name should be passed???
          />
        }
      />
      {/* <MdOutlineArrowForwardIos size="30" style={{ marginRight: 20 }}></MdOutlineArrowForwardIos> */}
      <Link to="/delivery-details" state={{ task: props.delivery }}>
        <IoIosArrowForward
          size="35"
          style={{ marginRight: 20 }}
        ></IoIosArrowForward>
      </Link>
      {/* </Link> */}
    </Box>
  );
};

export default Delivery;
