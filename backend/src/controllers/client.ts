import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ClientEntity } from '../entities/ClientEntity';
import { StatusCode } from './statusCode';

export default class ClientController {
  private ClientRepository = AppDataSource.getRepository(ClientEntity);

  getClient = async (request: Request, response: Response) => {
    const client = await this.ClientRepository.findOne({
      where: {
        id: parseInt(request.params.id)
      }
    });
    client
      ? response.status(StatusCode.OK).json({ client: client })
      : response.status(StatusCode.BAD_REQUEST).json({ client: null });
  };

  updateOrCreateClient = async (request: Request, response: Response) => {
    if (!request.params.id) {
      const newClient = new ClientEntity();
      newClient.username = request.body.username;
      newClient.password = request.body.password;
      newClient.address = request.body.address;
      newClient.email = request.body.email;
      newClient.phoneNumber = parseInt(request.body.phoneNumber);
      newClient.name = request.body.name;
      newClient.notes = request.body.notes;

      await this.ClientRepository.save(newClient);
      const client = await this.ClientRepository.findOne({
        where: {
          id: newClient.id
        }
      });
      response.status(StatusCode.OK).json({ client: client });
    } else {
      await this.ClientRepository.save({
        id: parseInt(request.params.id),
        username: request.body.username,
        password: request.body.password,
        address: request.body.address,
        email: request.body.email,
        phoneNumber: parseInt(request.body.phoneNumber),
        name: request.body.name,
        notes: request.body.notes
      });
      const client = await this.ClientRepository.findOne({
        where: {
          id: parseInt(request.params.id)
        }
      });
      response.status(StatusCode.OK).json({ client: client });
    }
  };

  deleteClient = async (request: Request, response: Response) => {
    const ClientDeleted = await this.ClientRepository.delete({
      id: parseInt(request.params.id)
    });
    response.status(StatusCode.OK).json({});
  };
}
