import AxiosInstance from './axios';

export const getRouteDeliveries = async () => {
    const response = await AxiosInstance({
        method: "get",
        url: "/route_delivery",
    });
    
    return response
}

export const setRouteDeliveryNumber = async (id: number, routeNumber: number) => {
    const response = await AxiosInstance({
        method: "put",
        url: "/route_delivery/" + id + "/set",
        data: {routeNumber: routeNumber}
    });
    
    return response
}

export const increaseRouteDeliveryPosition = async (props: {id: number}) => {
    const response = await AxiosInstance({
        method: "put",
        url: "/route_delivery/" + props.id + "/increment"
    });
    
    return response
}

export const decreaseRouteDeliveryPosition = async (props: {id: number}) => {
    const response = await AxiosInstance({
        method: "put",
        url: "/route_delivery/" + props.id + "/decrement"
    });
    
    return response
}
