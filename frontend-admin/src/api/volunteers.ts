import axios from 'axios';

export const getVolunteers = async () => {
    const response = await axios({
        method: "get",
        url: "http://localhost:3001/api/volunteers",
    });
    console.log(response)
    return response
}

export const getVolunteer = async (id: number) => {
    const response = await axios({
        method: "get",
        url: "http://localhost:3001/api/volunteers/"+id.toString(),
    });
    return response
}

export const editVolunteer = async (props: {id: number, data: any}) => {
    const response = await axios({
        method: "put",
        url: "http://localhost:3001/api/volunteers/"+props.id.toString()+"/edit",
        data: props.data
    });
    return response
}

export const createVolunteer = async (data: any) => {
    const response = await axios({
        method: "post",
        url: "http://localhost:3001/api/volunteers",
        data: data
    });
    return response
}
