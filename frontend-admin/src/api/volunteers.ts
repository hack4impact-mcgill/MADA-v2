import axios from 'axios';

export const getVolunteers = async () => {
    const response = await axios({
        method: "get",
        url: "http://localhost:3001/api/volunteers",
    });
    console.log(response)
    return response
}

export const createVolunteer = async (data: any) => {
    const response = await axios({
        method: "post",
        url: "http://localhost:3001/api/volunteers",
        data: data
    });
    console.log(response)
    return response
}
