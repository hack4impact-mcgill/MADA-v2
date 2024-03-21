export type ResponseData = {
    [key: string]: RouteDelivery[];
}

export type RouteDelivery = {
    id: string;
    routeNumber: number;
    routePosition: number;
    mealType: string;
    program: string;
    client?: any;
};