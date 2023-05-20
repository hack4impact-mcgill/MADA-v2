import AxiosInstance from './axios';

export const login = async (data: any) => {
    console.log("in auth.ts login")
    const response = await AxiosInstance.post('/volunteer-login', data)

    return response
}