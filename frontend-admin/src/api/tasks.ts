import axios from 'axios';

export const getTasks = async () => {
    const response = await axios({
        method: "get",
        url: "http://localhost:3001/api/tasks",
    });
    
    return response
}