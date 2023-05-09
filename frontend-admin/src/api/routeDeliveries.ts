import AxiosInstance from './axios';

export const getRouteDeliveries = async () => {
    const response = await AxiosInstance({
        method: "get",
        url: "/route_delivery",
    });
    
    return response
}

export const changeRouteDeliveryNumber = async (props: {id: number, routeNumber: number}) => {
    return null
}

export const increaseRouteDeliveryPosition = async (props: {id: number}) => {
    return null
}

export const decreaseRouteDeliveryPosition = async (props: {id: number}) => {
    return null
}
