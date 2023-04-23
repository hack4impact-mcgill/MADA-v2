import AxiosInstance from './axios';

export const getTasks = async () => {
    const response = await AxiosInstance({
        method: "get",
        url: "/tasks",
    });
    
    return response
}

export const createTask = async (data: any) => {
    const response = await AxiosInstance({
        method: "post",
        url: "/tasks",
        data: data
    });
    return response
}
