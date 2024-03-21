import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { ClientEntity } from '../../entities/ClientEntity';
import { RouteDeliveryEntity } from '../../entities/RouteDeliveryEntity';
import { ProgramType } from '../../entities/types';

import { generateStaffUser } from './user';

const generateRouteDelivery = async (
  program: ProgramType,
  client: ClientEntity
) => {
  const routeDelivery = new RouteDeliveryEntity();
  routeDelivery.routeNumber = 0;
  routeDelivery.routePosition = 0;
  routeDelivery.client = client;
  routeDelivery.mealType = client.mealType;
  routeDelivery.program = program;
  return routeDelivery;
};

const generateClient = async () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  const user = {
    name: firstName + ' ' + lastName,
    email: faker.internet.email(firstName, lastName),
    phoneNumber: faker.phone.number(),
    address: faker.address.streetAddress(),
    mealType: faker.helpers.arrayElement([
      'Regular',
      'Vegetarian',
      'No Fish',
      'No Meat'
    ]),
    sts: false,
    map: false,
    softDelete: false
  };
  user.sts = faker.datatype.boolean();
  user.map = !user.sts ? true : faker.datatype.boolean();

  return user;
};

const generateClients = async (num: number) => {
  const clients: any[] = [];
  for (let i = 0; i < num; i++) {
    const c = await generateClient();
    clients.push(c);
  }
  return clients;
};

export default class ClientSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const repository = dataSource.getRepository(ClientEntity);
    const clients = await generateClients(10);
    await repository.insert(clients);

    clients?.forEach(async (client) => {
      const routeDeliveryRepository =
        dataSource.getRepository(RouteDeliveryEntity);

      if (client.sts) {
        const stsRouteDelivery = await generateRouteDelivery(
          ProgramType.STS,
          client
        );
        await routeDeliveryRepository.insert(stsRouteDelivery);
      }

      if (client.map) {
        const mapRouteDelivery = await generateRouteDelivery(
          ProgramType.MAP,
          client
        );
        await routeDeliveryRepository.insert(mapRouteDelivery);
      }
    });
  }
}
