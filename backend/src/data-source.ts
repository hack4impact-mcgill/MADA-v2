import "reflect-metadata";
import { DataSource } from "typeorm";
import { ExampleEntity } from "./ExampleEntity";

// Create a data source i.e connection settings: https://orkhan.gitbook.io/typeorm/docs/data-source#what-is-datasource
export const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "test",
	password: "test",
	database: "test",
	synchronize: true,
	logging: false,
	entities: [ExampleEntity],
	migrations: [],
	subscribers: [],
});
