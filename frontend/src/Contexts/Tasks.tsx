import React from "react";
import { createContext, useState, useEffect } from "react";
import { getAllTasks } from "../services";
// define interfaces and define Task context provider

// expecting deliveries field to be populatd with MealDeliveryEntity's fields and not just their ids.
// I am not sure if the "recipient's name" and "address" fields will be in Task entity or MealDelivery Entity, but if "recipient's name" is in Task entity,
// Deliveries field might not need to be filled with actual fields, as long as there is an api that can query one specific delivery information.
// recipient's name is needed to display in the my tasks page, but the rest of the fields in MealDelivery entity will be used in Delivery Details page and not in My Tasks page.

export interface TaskInterface {
  id: number;
  date: Date;
  isCompleted: boolean;
  volunteer: any;
  deliveries: MealDeliveryInterface[];
}

export interface MealDeliveryInterface {
  id: number;
  isCompleted: boolean;
  routePosition: number;
  mealType: string;
  program: any;
  task: any;
  client: any;
}

// create a type for TaskContext
export type TaskContextType = {
  tasks: TaskInterface[];
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
};

// create a TaskContext of type TaskContextType or null.
export const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = (props: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  // dependency is empty array []. This will make fetch tasks only the first time TaskProvider component renders.
  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getAllTasks();
      console.log("all tasks", tasks);
      setTasks(tasks);
    };

    fetchTasks();
  },
  []);

  return (
    <>
      {/* Anything passed into value can be used by the children of this Provider */}
      <TaskContext.Provider value={{ tasks, setTasks }}>
        {props.children}
      </TaskContext.Provider>
    </>
  );
};
