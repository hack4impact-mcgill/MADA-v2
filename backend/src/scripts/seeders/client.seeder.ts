import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { ClientEntity } from '../../entities/ClientEntity';
import {generateStaffUser} from './user';

const generateClient = async () => {
    const client = await generateStaffUser() as any;
    client.address = faker.address.streetAddress()
    client.notes = faker.random.words(5)
    return client;
}

const generateClients = async (num: number) => {
    const clients: ClientEntity[] = [];
    for (let i = 0; i < num; i++) {
        const c = await generateClient()
        clients.push(c);
    }
    return clients;
}

export default class ClientSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const repository =  dataSource.getRepository(ClientEntity);
        const clients = await generateClients(10)
        await repository.insert(clients);
    }
}