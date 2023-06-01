import axios from "axios";
import { MealDeliveryInterface, TaskInterface } from "./Contexts/Tasks";

// URL to which requests will be sent
const API_URL = "http://localhost:3001/api";
const VOLUNTEER_ID = "5"; // will need to be replaced with actual logged in volunteer's id.

export const getAllTasks = async () => {
  try {
    // Uses axios to make a get request at "http://localhost:3001/api/tasks"
    const response = await axios.get(`${API_URL}/tasks`);
    console.log("inside getAllTasks helper function: fetching all tasks", response.data.tasks);
    return response.data.tasks;
  } catch (e) {
    throw new Error("Error in Axios get query to /tasks");
  }
};

export const getOneVolunteerTasks = async () => {
  try {
    // Uses axios to make a get request at "http://localhost:3001/api/tasks"
    const response = await axios.get(`${API_URL}/tasks/volunteer/${VOLUNTEER_ID}`);
    console.log("inside getOneVolunteerTasks helper function: fetching tasks ", response.data.tasks);
    return response.data.tasks;
  } catch (e) {
    throw new Error("Error in Axios get query to /tasks/volunteer/:id");
  }
};

export const getOneTask = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/tasks/${id}`);
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
      `${API_URL}/tasks/${task.id.toString()}`,
      task
    );
    return response.data;
  } catch (e) {
    throw new Error("Error in Axios update query to /tasks/<id>");
  }

};


export const createTask = async () => {
  try {
    // console.log("creating task");
    // Uses axios to make a put request at "http://localhost:3001/api/tasks"
    const response = await axios.put(`${API_URL}/tasks`);
    console.log(response.data.task, " yeahhhh");
    return response.data.task;
  } catch (e) {
    throw new Error("Error in Axios put query to /tasks");
  }
};

export const updateMealDelivery = async (mealDelivery: MealDeliveryInterface) => {
  try {
    // throw error if no id field is present in mealDelivery object
    if (!mealDelivery.id) {
      throw "no id field present in delivery";
    }
    // update task with put request
    console.log("updating the following mealdelivery: ", mealDelivery);
    const response = await axios.put(
      `${API_URL}/meal_delivery/${mealDelivery.id.toString()}`,
      mealDelivery
    );
    console.log(response);
    return response.data.mealDelivery;
  } catch (e) {
    throw new Error("Error in Axios update query to /meal_delivery/<id>");
  }

};