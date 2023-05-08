import AxiosInstance from './axios';

export const getRouteDeliveries = async () => {
    const response = await AxiosInstance({
        method: "get",
        url: "/route_delivery",
    });
    
    return response
}
