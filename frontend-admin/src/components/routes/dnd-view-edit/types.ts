export type ResponseData = {
    [key: string]: RouteDelivery[];
}

export type RouteDelivery = {
    id: number;
    routeNumber: number;
    routePosition: number;
    mealType: string;
    program: string;
    client?: any;
};