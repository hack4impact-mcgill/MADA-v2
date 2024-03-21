import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ClientEntity } from '../entities/ClientEntity';
// import { TaskEntity } from '../entities/TaskEntity';
import { RouteDeliveryEntity } from '../entities/RouteDeliveryEntity';
import { StatusCode } from './statusCode';
import { ProgramType, MealType } from '../entities/types';

export default class ClientController {
  private ClientRepository = AppDataSource.getRepository(ClientEntity);
  private RouteDeliveryRepository =
    AppDataSource.getRepository(RouteDeliveryEntity);

  getClients = async (request: Request, response: Response) => {
    const clients = await this.ClientRepository.find({
      where: {
        softDelete: false
      }
    });
    response.status(StatusCode.OK).json({ clients: clients });
  };

  createClient = async (request: Request, response: Response) => {
    const client = await this.ClientRepository.create({
      name: request.body.name,
      email: request.body.email,
      phoneNumber: request.body.phoneNumber,
      address: request.body.address,
      mealType: request.body.mealType,
      sts: request.body.sts,
      map: request.body.map
    });
    const savedClient = await this.ClientRepository.save(client);

    if (client.sts) {
      const stsRouteDelivery = new RouteDeliveryEntity();
      stsRouteDelivery.client = savedClient;
      stsRouteDelivery.routeNumber = 0;
      stsRouteDelivery.routePosition = 0;
      stsRouteDelivery.mealType = savedClient.mealType;
      stsRouteDelivery.program = ProgramType.STS;

      await this.RouteDeliveryRepository.save(stsRouteDelivery);
    }

    if (client.map) {
      const mapRouteDelivery = new RouteDeliveryEntity();
      mapRouteDelivery.client = savedClient;
      mapRouteDelivery.routeNumber = 0;
      mapRouteDelivery.routePosition = 0;
      mapRouteDelivery.mealType = savedClient.mealType;
      mapRouteDelivery.program = ProgramType.MAP;

      await this.RouteDeliveryRepository.save(mapRouteDelivery);
    }

    response.status(StatusCode.OK).json({ client });
  };

  getClient = async (request: Request, response: Response) => {
    const client = await this.ClientRepository.findOne({
      where: {
        id: parseInt(request.params.id),
        softDelete: false
      }
    });
    response.status(StatusCode.OK).json({ client: client });
  };

  editClient = async (request: Request, response: Response) => {
    const originalClient = await this.ClientRepository.findOne({
      where: { id: parseInt(request.params.id) }
    });

    const editedMealType = !(request.body.mealType == originalClient.mealType);
    const editedSTS = !(request.body.sts == originalClient.sts);
    const editedMAP = !(request.body.map == originalClient.map);

    const client = await this.ClientRepository.update(
      { id: parseInt(request.params.id) },
      {
        name: request.body.name,
        email: request.body.email,
        phoneNumber: request.body.phoneNumber,
        address: request.body.address,
        mealType: request.body.mealType,
        sts: request.body.sts,
        map: request.body.map
      }
    );

    const savedClient = await this.ClientRepository.findOne({
      where: { id: parseInt(request.params.id) }
    });

    if (editedSTS) {
      if (request.body.sts) {
        const stsRouteDelivery = new RouteDeliveryEntity();
        stsRouteDelivery.client = savedClient;
        stsRouteDelivery.routeNumber = 0;
        stsRouteDelivery.routePosition = 0;
        stsRouteDelivery.mealType = savedClient.mealType;
        stsRouteDelivery.program = ProgramType.STS;

        await this.RouteDeliveryRepository.save(stsRouteDelivery);
      } else {
        const stsRouteDelivery = await this.RouteDeliveryRepository.find({
          relations: { client: true },
          where: {
            client: { id: parseInt(request.params.id) },
            program: ProgramType.STS
          }
        });

        await this.RouteDeliveryRepository.remove(stsRouteDelivery);
      }
    }

    if (editedMAP) {
      if (request.body.map) {
        const mapRouteDelivery = new RouteDeliveryEntity();
        mapRouteDelivery.client = savedClient;
        mapRouteDelivery.routeNumber = 0;
        mapRouteDelivery.routePosition = 0;
        mapRouteDelivery.mealType = savedClient.mealType;
        mapRouteDelivery.program = ProgramType.MAP;

        await this.RouteDeliveryRepository.save(mapRouteDelivery);
      } else {
        const mapRouteDelivery = await this.RouteDeliveryRepository.find({
          relations: { client: true },
          where: {
            client: { id: parseInt(request.params.id) },
            program: ProgramType.MAP
          }
        });

        await this.RouteDeliveryRepository.remove(mapRouteDelivery);
      }
    }

    if (editedMealType) {
      const routeDeliveries = await this.RouteDeliveryRepository.find({
        relations: { client: true },
        where: { client: { id: parseInt(request.params.id) } }
      });

      routeDeliveries.forEach((routeDelivery) => {
        routeDelivery.mealType = savedClient.mealType;
      });

      this.RouteDeliveryRepository.save(routeDeliveries);
    }

    response.status(StatusCode.OK).json({ client });
  };
}
