import { createContext, useState, useEffect } from "react";
import { getAllTasks } from "../services";
// define interfaces and define Task context provider 

// expecting deliveries field to be populatd with MealDeliveryEntity
export interface TaskInterface {
  id: number;
  deliveryTime: Date;
  isCompleted: boolean;
  deliveries: {
    id: number;
    quantity: number;
    mealType: string;
  };
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
      const { tasks } = await getAllTasks();
      setTasks(tasks);
    };

    fetchTasks();
  }), [];

  return (
    <>
        {/* Anything passed into value can be used by the children of this Provider */}
        <TaskContext.Provider value={{tasks, setTasks}}>
            {props.children}
        </TaskContext.Provider>
    </>
)
};
