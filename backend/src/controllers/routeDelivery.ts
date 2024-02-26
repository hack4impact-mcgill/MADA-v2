import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { RouteDeliveryEntity } from '../entities/RouteDeliveryEntity';
import { TaskEntity } from '../entities/TaskEntity';
import { StatusCode } from './statusCode';

export default class RouteDeliveryController {
  private RouteDeliveryRepository =
    AppDataSource.getRepository(RouteDeliveryEntity);

  // TODO: review this? v
  getRouteDeliveriesSimple = async (request: Request, response: Response) => {
    const routes = await this.RouteDeliveryRepository.find({
      relations: {
        client: true
      }
    });

    response.status(StatusCode.OK).json({ routes: routes });
  };

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
    const r = await this.getRouteFromId(parseInt(request.params.id))
    
    await this.RouteDeliveryRepository.decrement(
      { routeNumber: r.routeNumber, routePosition: r.routePosition + 1 },
      'routePosition',
      1
    );

    const route = await this.RouteDeliveryRepository.increment(
      { id: parseInt(request.params.id) },
      'routePosition',
      1
    );
    
    response.status(StatusCode.OK).json({ route });
  };

  decrementRoutePosition = async (request: Request, response: Response) => {
    const r = await this.getRouteFromId(parseInt(request.params.id))
    
    await this.RouteDeliveryRepository.increment(
      { routeNumber: r.routeNumber, routePosition: r.routePosition - 1 },
      'routePosition',
      1
    );

    const route = await this.RouteDeliveryRepository.decrement(
      { id: parseInt(request.params.id) },
      'routePosition',
      1
    );
    
    response.status(StatusCode.OK).json({ route });
  };

  // Helper Functions

  getRouteFromId = async (id: number) => {
    const route = await this.RouteDeliveryRepository.findOne({
      where: {
        id: id
      }
    });

    return route
  }

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
