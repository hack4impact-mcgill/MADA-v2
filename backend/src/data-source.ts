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
require('dotenv').config();

// Create a data source i.e connection settings: https://orkhan.gitbook.io/typeorm/docs/data-source#what-is-datasource
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_URL,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
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
