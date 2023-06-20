import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { VolunteerEntity } from '../entities/VolunteerEntity';

export default class authenticationController {
  login = async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const repository = AppDataSource.getRepository(VolunteerEntity);

    const volunteer: VolunteerEntity = await repository.findOne({
      where: { email: email }
    });

    if (volunteer && (await bcrypt.compare(password, volunteer.password))) {
      const token = jwt.sign(
        volunteer.id.toString(),
        process.env.JWT_PRIVATE_KEY
      );
      return res.status(200).json({ token: token, user: volunteer });
    }
    return res.status(400).json({ error: 'bad login informations' });
  };
}
