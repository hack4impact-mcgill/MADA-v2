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

    getClient = async (request: Request, response: Response) => {
        const client = await this.ClientRepository.findOne({
            where: { id: parseInt(request.params.id) }
        });
        response.status(StatusCode.OK).json({ client: client });
    };

    editClient = async (request: Request, response: Response) => {
        const client = await this.ClientRepository.update({id: parseInt(request.params.id)}, request.body);
        response.status(StatusCode.OK).json({client});
    };
}
