import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ClientEntity } from '../entities/ClientEntity';
// import { TaskEntity } from '../entities/TaskEntity';
import { StatusCode } from './statusCode';

export default class ClientController {
  private ClientRepository = AppDataSource.getRepository(ClientEntity);

  getClients = async (request: Request, response: Response) => {
    const clients = await this.ClientRepository.find();
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
      map: request.body.map,
    });
    await this.ClientRepository.save(client);
    response.status(StatusCode.OK).json({ client });
  };

  getClient = async (request: Request, response: Response) => {
    const client = await this.ClientRepository.findOne({
      where: { id: parseInt(request.params.id) }
    });
    response.status(StatusCode.OK).json({ client: client });
  };

  editClient = async (request: Request, response: Response) => {
    const client = await this.ClientRepository.update(
      { id: parseInt(request.params.id) },
      request.body
    );
    response.status(StatusCode.OK).json({ client });
  };
}
