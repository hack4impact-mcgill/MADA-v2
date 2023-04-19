import { runSeeders, runSeeder } from 'typeorm-extension';
import VolunteerSeeder from './db/volunteer.seeder';
import ClientSeeder from './db/client.seeder';
import { AppDataSource } from './data-source';

export const seed = async () => {
    await AppDataSource.initialize();

    console.log("Begin Seeding");

    await runSeeder(AppDataSource, VolunteerSeeder);
    await runSeeder(AppDataSource, ClientSeeder);

    console.log("Done seeding");
}

seed();