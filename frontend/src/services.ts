import axios from "axios";
import { MealDeliveryInterface, TaskInterface } from "./Contexts/Tasks";
import { VolunteerType } from "./Containers/UserContainer";

// URL to which requests will be sent
const API_URL = "https://<HOST_DOMAIN_NAME>/api"; // should be replaced by real host domain name. e.g. https://madaapp.com/api
const VOLUNTEER_ID = "5"; // will need to be replaced with actual logged in volunteer's id.
console.log("why");

export const getAllTasks = async () => {
  try {
    // Uses axios to make a get request at "http://localhost:3001/api/tasks"
    const response = await axios.get(`${API_URL}/tasks`);
    console.log(
      "inside getAllTasks helper function: fetching all tasks",
      response.data.tasks
    );
    return response.data.tasks;
  } catch (e) {
    alert("Error in Axios get query to /tasks. Could not get all tasks.");
  }
};

export const getOneVolunteerTasks = async () => {
  try {
    // Uses axios to make a get request at "http://localhost:3001/api/tasks"
    const response = await axios.get(
      `${API_URL}/tasks/volunteer/${VOLUNTEER_ID}`
    );
    console.log(
      "inside getOneVolunteerTasks helper function: fetching tasks ",
      response.data.tasks
    );
    return response.data.tasks;
  } catch (e) {
    alert(
      "Error in Axios get query to /tasks/volunteer/:id. Could not get all tasks for one volunteer."
    );
  }
};

export const getOneTask = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/tasks/${id}`);
    return response.data;
  } catch (e) {
    alert(
      "Error in Axios get query to /tasks/<id>. Could not get one specific task."
    );
  }
};

export const updateTask = async (task: TaskInterface) => {
  try {
    // alert error if no id field is present in task object
    if (!task.id) {
      alert("no id field present in task");
    }
    // update task with put request
    const response = await axios.put(
      `${API_URL}/tasks/${task.id.toString()}`,
      task
    );
    return response.data;
  } catch (e) {
    alert(
      "Error in Axios update query to /tasks/<id>. Could not update one task."
    );
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
    alert("Error in Axios put query to /tasks. Could not create a task.");
  }
};

export const updateMealDelivery = async (
  mealDelivery: MealDeliveryInterface
) => {
  try {
    // alert error if no id field is present in mealDelivery object
    if (!mealDelivery.id) {
      alert("no id field present in delivery");
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
    alert(
      "Error in Axios update query to /meal_delivery/<id>. Could not update one meal dealivery."
    );
  }
};

export const getVolunteer = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/volunteers/${id}`);
    return response.data;
  } catch (e) {
    alert(`Error in Axios get query to /volunteers/${id}`);
  }
};

export const editVolunteer = async (
  id: number | undefined,
  updatedVolunteer: Partial<VolunteerType>
) => {
  try {
    const response = await axios.put(
      `${API_URL}/volunteers/${id}/edit`,
      updatedVolunteer
    );
    return response.data.volunteer;
  } catch (error) {
    alert(`Error in Axios put to /volunteers/${id}/edit`);
  }
};
