import React from "react";
import { createContext, useState, useEffect } from "react";
import { getAllTasks, getOneVolunteerTasks } from "../services";
import { Volunteer } from "./Volunteer";
// define interfaces and define Task context provider

const enum ProgramType {
  MAP = 'MAP',
  STS = 'STS'
}

const enum MealType {
  VEGETARIAN = 'Vegetarian',
  NOFISH = 'No Fish',
  NOMEAT = 'No Meat'
}

export interface TaskInterface {
  id: number;
  date: Date;
  isCompleted: boolean;
  volunteer: Volunteer
  deliveries: MealDeliveryInterface[];
}

export interface MealDeliveryInterface {
  id: number;
  isCompleted: boolean;
  routePosition: number;
  mealType: string;
  program: any
  task: any;
  client: any;
}

// create a type for TaskContext
export type TaskContextType = {
  tasks: TaskInterface[];
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
  shouldReFetch: boolean;
  setShouldReFetch: React.Dispatch<React.SetStateAction<boolean>>;
};

// create a TaskContext of type TaskContextType or null.
export const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = (props: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [shouldReFetch, setShouldReFetch] = useState<boolean>(false); // refetches from database when toggled

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getOneVolunteerTasks();
      console.log("all tasks", tasks);
      setTasks(tasks);
    };

    fetchTasks();
  },
  [shouldReFetch]); // refetching happens when shouldReFetch is toggled

  return (
    <>
      {/* Anything passed into value can be used by the children of this Provider */}
      <TaskContext.Provider value={{ tasks, setTasks, shouldReFetch, setShouldReFetch }}>
        {props.children}
      </TaskContext.Provider>
    </>
  );
};
