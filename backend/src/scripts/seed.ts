import { runSeeder } from 'typeorm-extension';
import VolunteerSeeder from './seeders/volunteer.seeder';
import ClientSeeder from './seeders/client.seeder';
import AdminSeeder from './seeders/admin.seeder';

import { AppDataSource } from '../data-source';

export const seed = async () => {
    console.log("Begin initalizing data source");
    await AppDataSource.initialize();

    console.log("Begin seeding");
    await runSeeder(AppDataSource, ClientSeeder);
    console.log("Seeded Clients");
    await runSeeder(AppDataSource, VolunteerSeeder);
    console.log("Seeded Volunteers");
    await runSeeder(AppDataSource, AdminSeeder);
    console.log("Seeded Admin");

    console.log("Done seeding");
}

seed();