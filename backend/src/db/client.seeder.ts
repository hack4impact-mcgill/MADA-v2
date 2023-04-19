import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { ClientEntity } from '../entities/ClientEntity';

const generateClient = () => {
    const client = new ClientEntity();
    client.name = faker.name.fullName();
    client.username = faker.internet.userName();
    client.password = faker.internet.password();
    client.email = faker.internet.email(client.username);
    client.address = faker.address.streetAddress()
    client.phoneNumber = parseInt(faker.random.numeric(6));
    client.notes = faker.random.words(5)
    return client;
}

const generateClients = (num: number) => {
    const clients: ClientEntity[] = [];
    for (let i = 0; i < num; i++) {
        clients.push(generateClient());
    }
    return clients;
}

export default class ClientSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const repository =  dataSource.getRepository(ClientEntity);
        await repository.insert(generateClients(10));
    }
}