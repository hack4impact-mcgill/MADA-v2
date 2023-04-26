import axios from "axios";
import { TaskInterface } from "./Contexts/Tasks";

// URL to which requests will be sent
const TASK_API_URL = "http://localhost:3001/api";

export const getAllTasks = async () => {
  try {
    // Uses axios to make a get request at "http://localhost:3001/api/tasks"
    const response = await axios.get(`${TASK_API_URL}/tasks`);
    return response.data;
  } catch (e) {
    throw new Error("Error in Axios get query to /tasks");
  }
};

export const getOneTask = async (id: number) => {
  try {
    const response = await axios.get(`${TASK_API_URL}/tasks/${id}`);
    return response.data;
  } catch (e) {
    throw new Error("Error in Axios get query to /tasks/<id>");
  }
};

export const updateTask = async (task: TaskInterface) => {
  try {
    // throw error if no id field is present in task object
    if (!task.id) {
      throw "no id field present in task";
    }
    // update task with put request
    const response = await axios.put(
      `${TASK_API_URL}/tasks/${task.id.toString()}`,
      task
    );
    return response.data;
  } catch (e) {
    throw new Error("Error in Axios update query to /tasks/<id>");
  }
};

export const getAllVolunteers = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/volunteers");
    console.log(
      "inside getAllVolunteers helper function: fetching all volunteers",
      res.data.volunteers
    );
    return res.data.volunteers;
  } catch (e) {
    throw new Error("Error in Axios get query to /volunteers");
  }
};
