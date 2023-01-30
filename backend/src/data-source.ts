import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { AdminEntity } from './entities/AdminEntity';
import { ClientEntity } from './entities/ClientEntity';
import { MealDeliveryEntity } from './entities/MealDeliveryEntity';
import { TaskEntity } from './entities/TaskEntity';
import { UserEntity } from './entities/UserEntity';
import { VolunteerEntity } from './entities/VolunteerEntity';

// Create a data source i.e connection settings: https://orkhan.gitbook.io/typeorm/docs/data-source#what-is-datasource
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'test',
  password: 'test',
  database: 'test',
  synchronize: true,
  logging: false,
  entities: [
    AdminEntity,
    MealDeliveryEntity,
    TaskEntity,
    UserEntity,
    VolunteerEntity,
    ClientEntity
  ],
  migrations: [],
  subscribers: []
});
