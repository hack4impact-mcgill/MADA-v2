import axios from 'axios';

export const getClients = async () => {
    const response = await axios({
        method: "get",
        url: "http://localhost:3001/api/clients",
    });
    
    return response
}