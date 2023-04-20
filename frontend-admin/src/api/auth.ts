import axios from 'axios';

export const login = async (data: any) => {
    const response = await axios({
        method: "post",
        url: "http://localhost:3001/api/admin-login",
        data: data
    });
    
    return await response
}
