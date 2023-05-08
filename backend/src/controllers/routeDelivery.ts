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
    response.status(StatusCode.OK).json({ routes: routes });
  };
}
