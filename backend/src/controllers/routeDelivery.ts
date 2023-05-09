import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { RouteDeliveryEntity } from '../entities/RouteDeliveryEntity';
import { TaskEntity } from '../entities/TaskEntity';
import { StatusCode } from './statusCode';

export default class RouteDeliveryController {
  private RouteDeliveryRepository = AppDataSource.getRepository(RouteDeliveryEntity);

  getRouteDeliveries = async (request: Request, response: Response) => {
    const routes = await this.RouteDeliveryRepository.find({
        relations: {
            client: true
        }
    });

    // Create groups of routes by routeNumber
    const groups = routes.reduce((groups, route) => {
        const key = route.routeNumber;
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(route);
        return groups;
    }, {});
    
    // // Sort groups by routePosition
    // for (const routeNumber in groups) {
    //     console.log("route group ",groups[routeNumber])
    //     groups[routeNumber].sort((routeA, routeB) => {
    //         if (routeA.routePosition > routeB.routePosition) {
    //             return 1;
    //         }
    //     })
    // }

    response.status(StatusCode.OK).json({ routes: groups });
  };
}
