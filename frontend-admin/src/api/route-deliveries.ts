import AxiosInstance from './axios';

export const getRouteDeliveries = async () => {
    const response = await AxiosInstance({
        method: "get",
        url: "/route_delivery",
    });
    
    return response
}

// TODO: review this
export const getRouteDeliveriesSimple = async () => {
    const response = await AxiosInstance({
        method: "get",
        url: "/route_delivery_simple",
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

export const increaseRouteDeliveryPosition = async (id: number) => {
    const response = await AxiosInstance({
        method: "put",
        url: "/route_delivery/" + id + "/increment"
    });
    
    return response
}

export const decreaseRouteDeliveryPosition = async (id: number) => {
    const response = await AxiosInstance({
        method: "put",
        url: "/route_delivery/" + id + "/decrement"
    });
    
    return response
}

export const saveAllRouteDeliveries = async (editRoutes: any) => {
    const response = await AxiosInstance({
        method: "post",
        url: "/route_delivery",
        data: {routes: editRoutes}
    });
    
    return response
}
