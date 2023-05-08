import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { MealDeliveryEntity } from '../entities/MealDeliveryEntity';
import { TaskEntity } from '../entities/TaskEntity';
import { StatusCode } from './statusCode';

export default class RouteDeliveryController {
  private RouteDeliveryRepository = AppDataSource.getRepository(MealDeliveryEntity);

  getRouteDeliveries = async (request: Request, response: Response) => {
    const routes = await this.RouteDeliveryRepository.find({});
    response.status(StatusCode.OK).json({ routes });
  };
}
