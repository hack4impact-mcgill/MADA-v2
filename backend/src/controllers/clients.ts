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
}
