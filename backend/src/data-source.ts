import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ClientEntity } from './entities/ClientEntity';
import { UserEntity } from './entities/UserEntity';
import { AdminEntity } from './entities/AdminEntity';
import { ExampleEntity } from './ExampleEntity';

// Create a data source i.e connection settings: https://orkhan.gitbook.io/typeorm/docs/data-source#what-is-datasource
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'test',
  synchronize: true,
  logging: false,
  entities: [ExampleEntity, UserEntity, ClientEntity, AdminEntity],
  migrations: [],
  subscribers: []
});
