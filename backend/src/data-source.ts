import 'reflect-metadata';

import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { RouteDeliveryEntity } from './entities/RouteDeliveryEntity';
import { AdminEntity } from './entities/AdminEntity';
import { ClientEntity } from './entities/ClientEntity';
import { MealDeliveryEntity } from './entities/MealDeliveryEntity';
import { TaskEntity } from './entities/TaskEntity';
import { UserEntity } from './entities/UserEntity';
import { VolunteerEntity } from './entities/VolunteerEntity';

// Create a data source i.e connection settings: https://orkhan.gitbook.io/typeorm/docs/data-source#what-is-datasource
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'postgres', // set to localhost when seeding from your terminal! hostname 'postgres' is needed for backend container within docker network to access the database container.
  port: 5432,
  username: 'postgres',
  password: '>7>?cqME+G{r>1pi0(s}7E+2>7>?>jh!2',
  database: 'mada',
  synchronize: true,
  logging: false,
  entities: [
    AdminEntity,
    MealDeliveryEntity,
    TaskEntity,
    UserEntity,
    VolunteerEntity,
    ClientEntity,
    RouteDeliveryEntity
  ],
  migrations: [],
  subscribers: [],
  seeds: ['src/db/*.seeder.ts'],
  factories: ['src/db/*.factory.ts']
} as SeederOptions & DataSourceOptions);
