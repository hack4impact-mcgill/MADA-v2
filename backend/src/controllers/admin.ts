import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { AdminEntity } from '../entities/AdminEntity';
import { StatusCode } from './statusCode';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

require('dotenv').config()
const TOKEN_KEY = process.env.TOKEN_KEY

export default class AdminController {
    private AdminRepository = AppDataSource.getRepository(AdminEntity);

    login = async (request: Request, response: Response) => {
        const { email, password } = request.body;

        const adminUser = await this.AdminRepository.findOne({where: { email }});

        // User not found
        if (!adminUser) return response.status(StatusCode.NOT_FOUND).json({ message: "User not found" });

        if (await bcrypt.compare(password, adminUser.password)) {
            const token = jwt.sign(
                { username: adminUser.username, email: email },
                    TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            // Login successful
            return response.status(StatusCode.OK).json({ token: token });
        } else {
            // Wrong password
            return response.status(StatusCode.UNAUTHORIZED).json({ message: "Invalid Credentials" });
        }
    };
}
