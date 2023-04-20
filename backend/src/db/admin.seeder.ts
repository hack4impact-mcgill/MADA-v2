import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { AdminEntity } from '../entities/AdminEntity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const TOKEN_KEY = "hack4impactmcgillmada"

const DEFAULT_ADMIN = {
    name: "Admin",
    username: "admin",
    password: "pw",
    email: "admin@example.com",
    jobTitle: "Administrator"
}

const generateAdmin = async () => {
    const admin = new AdminEntity();
    admin.name = DEFAULT_ADMIN.name;
    admin.username = DEFAULT_ADMIN.username;
    const encryptedPassword = await bcrypt.hash(DEFAULT_ADMIN.password, 10);
    admin.password = encryptedPassword;
    admin.email = DEFAULT_ADMIN.email;
    admin.phoneNumber = faker.phone.number()
    admin.jobTitleColumn = DEFAULT_ADMIN.jobTitle;
    const token = jwt.sign(
        { username: admin.username, email: admin.email },
            TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );
    admin.token = token
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