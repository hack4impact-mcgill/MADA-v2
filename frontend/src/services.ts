import axios from "axios";
import { TaskInterface } from "./Contexts/Tasks";
import { Availabilities } from "./Contexts/Volunteer";

// URL to which requests will be sent
const API_URL = "http://localhost:3001/api";

//Task services

export const getAllTasks = async () => {
  try {
    // Uses axios to make a get request at "http://localhost:3001/api/tasks"
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (e) {
    throw new Error("Error in Axios get query to /tasks");
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

//Volunteer services

export const getOneVolunteer = async (id: number) => {
    try {
    const response = await axios.get(`${API_URL}/volunteers/${id}`);
    return response.data;
  } catch (e) {
    throw new Error("Error in Axios get query to /volunteers/<id>");
  }
}

export const editVolunteerAvailabilities = async (id: number, availabilities: { availabilities: string }) => {
    try {
    const response = await axios.put(`${API_URL}/volunteers/${id}/edit`, availabilities);
    return response.data;
  } catch (e) {
    throw new Error("Error in Axios put query to /volunteers/<id>/edit");
  }
}

export const getVolunteerTasks = async (id: number) => {
    try {
    const response = await axios.get(`${API_URL}/volunteers/${id}/tasks`);
    return response.data;
  } catch (e) {
    throw new Error("Error in Axios get query to /volunteers/<id>/tasks");
  }
}

export const getAvailabilitiesLastUpdated = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/volunteers/${id}`);
    return response.data.volunteer.availabilitiesLastUpdated;
  } catch (e) {
    throw new Error("Error in Axios get query to /volunteers/<id>/");
  }
}

export const editAvailabilitiesLastUpdated = async (id: number, date: { availabilitiesLastUpdated: Date }) => {
    try {
    const response = await axios.put(`${API_URL}/volunteers/${id}/edit`, date);
    return response.data;
  } catch (e) {
    throw new Error("Error in Axios put query to /volunteers/<id>/edit");
  }
}