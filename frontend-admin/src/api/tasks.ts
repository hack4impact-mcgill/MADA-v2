import axios from 'axios';

export const getTasks = async () => {
    const response = await axios({
        method: "get",
        url: "http://localhost:3001/api/tasks",
    });
    
    return response
}

export const createTask = async (data: any) => {
    const response = await axios({
        method: "post",
        url: "http://localhost:3001/api/tasks",
        data: data
    });
    return response
}
