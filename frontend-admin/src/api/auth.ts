import AxiosInstance from './axios';

export const login = async (data: any) => {
    const response = await AxiosInstance.post('/admin-login', data)
    
    return response
}
