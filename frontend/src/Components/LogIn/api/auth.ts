import AxiosInstance from './axios';

export const login = async (data: any) => {
    const response = await AxiosInstance.post('/volunteer-login', data)
    
    return response
}
