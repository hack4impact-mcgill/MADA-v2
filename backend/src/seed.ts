import { runSeeders, runSeeder } from 'typeorm-extension';
import VolunteerSeeder from './db/volunteer.seeder';
import ClientSeeder from './db/client.seeder';
import AdminSeeder from './db/admin.seeder';

import { AppDataSource } from './data-source';

export const seed = async () => {
    console.log("Begin initalizing data source");
    await AppDataSource.initialize();

    console.log("Begin seeding");
    await runSeeder(AppDataSource, VolunteerSeeder);
    console.log("Seeded Volunteers");
    await runSeeder(AppDataSource, ClientSeeder);
    console.log("Seeded Clients");
    await runSeeder(AppDataSource, AdminSeeder);
    console.log("Seeded Admin");

    console.log("Done seeding");
}

seed();