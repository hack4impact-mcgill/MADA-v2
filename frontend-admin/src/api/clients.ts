import axios from 'axios';

export const getClients = async () => {
    const response = await axios({
        method: "get",
        url: "http://localhost:3001/api/clients",
    });
    
    return response
}

export const getClient = async (id: number) => {
    const response = await axios({
        method: "get",
        url: "http://localhost:3001/api/clients/"+id.toString(),
    });
    return response
}

export const editClient = async (props: {id: number, data: any}) => {
    const response = await axios({
        method: "put",
        url: "http://localhost:3001/api/clients/"+props.id.toString()+"/edit",
        data: props.data
    });
    return response
}