import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { RouteDeliveryEntity } from '../entities/RouteDeliveryEntity';
import { TaskEntity } from '../entities/TaskEntity';
import { StatusCode } from './statusCode';

export default class RouteDeliveryController {
  private RouteDeliveryRepository =
    AppDataSource.getRepository(RouteDeliveryEntity);

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

    // Sort groups by routePosition
    for (const routeNumber in groups) {
      groups[routeNumber].sort(
        (routeA, routeB) => routeA.routePosition - routeB.routePosition
      );
    }

    response.status(StatusCode.OK).json({ routes: groups });
  };

  setRouteNumber = async (request: Request, response: Response) => {
    const routePosition = request.body.routeNumber == 0 ? 0 : await this.getNextRouteNumber(request.body.routeNumber)

    const route = await this.RouteDeliveryRepository.update(
      { id: parseInt(request.params.id) },
      { routeNumber: request.body.routeNumber, routePosition: routePosition}
    );

    response.status(StatusCode.OK).json({ route });
  };

  incrementRoutePosition = async (request: Request, response: Response) => {
    const route = await this.RouteDeliveryRepository.increment(
      { id: parseInt(request.params.id) },
      'routePosition',
      1
    );
    response.status(StatusCode.OK).json({ route });
  };

  decrementRoutePosition = async (request: Request, response: Response) => {
    const route = await this.RouteDeliveryRepository.decrement(
      { id: parseInt(request.params.id) },
      'routePosition',
      1
    );
    response.status(StatusCode.OK).json({ route });
  };

  // Get the next route number
  getNextRouteNumber = async (routeNumber) => {
    const routes = await this.RouteDeliveryRepository.find({
      where: {
        routeNumber: routeNumber
      }
    });
    
    return routes.length || 0;
  }
}
