import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { AdminEntity } from '../entities/AdminEntity';
import { StatusCode } from './statusCode';
import * as bcrypt from 'bcryptjs';

import * as jwt from 'jsonwebtoken';

const TOKEN_KEY = "hack4impactmcgillmada"

export default class AdminController {
    private AdminRepository = AppDataSource.getRepository(AdminEntity);

    login = async (request: Request, response: Response) => {
        // const { email, password } = request.body;

        const email = "admin@example.com"
        const password = "pw"

        const adminUser = await this.AdminRepository.findOne({
            where: { email: email }
        });

        if (adminUser && (await bcrypt.compare(password, adminUser.password))) {
            const token = jwt.sign(
                { username: adminUser.username, email: email },
                    TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
    
            adminUser.token = token;
    
            response.status(StatusCode.OK).json({ admin: adminUser });
        }
         
        response.status(400).send("Invalid Credentials");
    };

}
