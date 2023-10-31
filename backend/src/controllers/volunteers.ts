import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { VolunteerEntity } from '../entities/VolunteerEntity';
// import { TaskEntity } from '../entities/TaskEntity';
import { StatusCode } from './statusCode';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ResetTokenEntity } from '../entities/ResetTokenEntity';
const crypto = require('crypto');
import { sendEmail } from '../utils/sendEmail';

const URL = 'localhost:3000';

export default class VolunteerController {
  private VolunteerRepository = AppDataSource.getRepository(VolunteerEntity);

  getVolunteers = async (request: Request, response: Response) => {
    const volunteers = await this.VolunteerRepository.find({
      relations: {
        tasks: true
      }
    });
    response.status(StatusCode.OK).json({ volunteers: volunteers });
  };

  getVolunteer = async (request: Request, response: Response) => {
    const volunteer = await this.VolunteerRepository.findOne({
      where: { id: parseInt(request.params.id) },
      relations: {
        tasks: true
      }
    });
    response.status(StatusCode.OK).json({ volunteer: volunteer });
  };

  removeVolunteer = async (request: Request, response: Response) => {
    await this.VolunteerRepository.delete({
      id: parseInt(request.params.id)
    });
    response.status(StatusCode.OK).json({});
  };

  createVolunteer = async (request: Request, response: Response) => {
    const volunteer = await this.VolunteerRepository.create({
      name: request.body.name,
      password: request.body.password,
      email: request.body.email,
      phoneNumber: request.body.phoneNumber,
      startDate: request.body.date,
      profilePicture: '',
      availabilities: request.body.availabilities
    });
    await this.VolunteerRepository.save(volunteer);
    response.status(StatusCode.OK).json({ volunteer });
  };

  editVolunteer = async (request: Request, response: Response) => {
    const volunteer = await this.VolunteerRepository.update(
      { id: parseInt(request.params.id) },
      request.body
    );
    response.status(StatusCode.OK).json({ volunteer });
  };

  getVolunteerTasks = async (request: Request, response: Response) => {
    const volunteer = await this.VolunteerRepository.findOne({
      where: { id: parseInt(request.params.id) },
      relations: ['tasks', 'tasks.deliveries']
    });
    volunteer == null
      ? response.status(StatusCode.NOT_FOUND).json({})
      : response.status(StatusCode.OK).json({ tasks: volunteer.tasks });
  };

  getVolunteerAvailabilities = async (request: Request, response: Response) => {
    const volunteer = await this.VolunteerRepository.findOne({
      where: { id: parseInt(request.params.id) },
      relations: ['availabilities']
    });
    volunteer == null
      ? response.status(StatusCode.NOT_FOUND).json({})
      : response
          .status(StatusCode.OK)
          .json({ availabilities: volunteer.availabilities });
  };

  login = async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const repository = AppDataSource.getRepository(VolunteerEntity);
    const volunteer: VolunteerEntity = await repository.findOne({
      where: { email: email }
    });

    if (volunteer && (await bcrypt.compare(password, volunteer.password))) {
      // bad login info
      const token = jwt.sign(
        volunteer.id.toString(),
        process.env.JWT_PRIVATE_KEY
      );
      return res.status(200).json({ token: token, user: volunteer });
    }
    return res.status(400).json({ error: 'bad login informations' });
  };

  requestPasswordReset = async (req: Request, res: Response) => {
    const { email }: { email: string } = req.body;
    const volunteerRepo = AppDataSource.getRepository(VolunteerEntity);
    const volunteer: VolunteerEntity = await volunteerRepo.findOne({
      where: { email: email }
    });

    console.log(email);
    if (!volunteer) throw new Error('Email does not exist');

    const resetTokenRepo = AppDataSource.getRepository(ResetTokenEntity);
    let foundToken = await resetTokenRepo.findOne({
      where: { userId: volunteer.id }
    });
    if (foundToken) await resetTokenRepo.remove(foundToken);

    let resetToken = crypto.randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(resetToken, 10); // 10 is arbitrary

    const newToken = await resetTokenRepo.save({
      userId: volunteer.id,
      token: hash
    });

    const link = `${URL}/passwordReset?token=${resetToken}&userid=${volunteer.id}`;

    sendEmail(
      volunteer.email,
      'Password Reset Request',
      {
        name: volunteer.name,
        link: link
      },
      './template/requestResetPassword.handlebars'
    );
    return res.status(200).json({ messsage: "Password request sent" });
  };

  resetPassword = async (req: Request, res: Response) => {
    const {
      userId,
      token,
      password
    }: { userId: number; token: string; password: string } = req.body;
    const resetTokenRepo = AppDataSource.getRepository(ResetTokenEntity);

    const passwordResetToken = await resetTokenRepo.findOne({
      where: { userId: userId }
    });

    if (!passwordResetToken) {
      throw new Error('Invalid or expired password reset token');
    }

    console.log(passwordResetToken.token, token);

    const isValid = await bcrypt.compare(token, passwordResetToken.token);

    if (!isValid) {
      throw new Error('Invalid or expired password reset token');
    }

    const hash = await bcrypt.hash(password, 10); // 10 is arbitrary

    const volunteerRepo = AppDataSource.getRepository(VolunteerEntity);

    await volunteerRepo.save({ id: userId, password: hash });

    const volunteer = await volunteerRepo.findOne({ where: { id: userId } });

    sendEmail(
      volunteer.email,
      'Password Reset Successfully',
      {
        name: volunteer.name
      },
      './template/resetPassword.handlebars'
    );

    await resetTokenRepo.remove(passwordResetToken);

    return res.status(200).json({ messsage: "Password reset was successful" });
  };
}
