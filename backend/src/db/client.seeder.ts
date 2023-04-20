import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { ClientEntity } from '../entities/ClientEntity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const TOKEN_KEY = "hack4impactmcgillmada"

const generateClient = async () => {
    const client = new ClientEntity();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    client.name = firstName + " " + lastName;
    client.username = faker.internet.userName(firstName, lastName);
    client.password = await bcrypt.hash(faker.internet.password(), 10);
    client.email = faker.internet.email(firstName, lastName);
    client.address = faker.address.streetAddress()
    client.phoneNumber = faker.phone.number()
    client.notes = faker.random.words(5)
    const token = jwt.sign(
        { username: client.username, email: client.email },
            TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );
    client.token = token
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