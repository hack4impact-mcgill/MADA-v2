import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { AdminEntity } from '../../entities/AdminEntity';
import * as bcrypt from 'bcryptjs';
import {generateStaffUser} from './user';

const DEFAULT_ADMIN = {
    username: "admin",
    password: "pw",
    email: "admin@example.com",
    jobTitle: "Administrator"
}

const generateAdmin = async () => {
    const admin = await generateStaffUser() as any;
    admin.username = DEFAULT_ADMIN.username;
    admin.password = await bcrypt.hash(DEFAULT_ADMIN.password, 10);
    admin.email = DEFAULT_ADMIN.email;
    admin.jobTitleColumn = DEFAULT_ADMIN.jobTitle;
    return admin;
}

export default class AdminSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const repository =  dataSource.getRepository(AdminEntity);
        const adminUser = await generateAdmin()
        await repository.insert(adminUser);
    }
}