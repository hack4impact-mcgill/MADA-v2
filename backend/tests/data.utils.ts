import { AppDataSource } from '../src/data-source';

// Class with data source utility methods
export default class DataSourceHelper {
    // Sets up the data source
    static setupDataSource = async () => {
        await AppDataSource.initialize()
    }

    // Destroys the data source
    static destroyDataSource = async () => {
        await AppDataSource.destroy()
    }

    // Clears all entities from the data source
    static clearDataSource = async () => {
        const entities = AppDataSource.entityMetadatas;
        for (const entity of entities) {
            const repository = await AppDataSource.getRepository(entity.name);
            await repository.query(`TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`);
        }
    }
}