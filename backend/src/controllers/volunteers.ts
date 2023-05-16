import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { VolunteerEntity } from '../entities/VolunteerEntity';
// import { TaskEntity } from '../entities/TaskEntity';
import { StatusCode } from './statusCode';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

require('dotenv').config();
const TOKEN_KEY = process.env.TOKEN_KEY;

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
      availabilities: []
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
    const task = await this.VolunteerRepository.findOne({
      where: { id: parseInt(request.params.id) },
      relations: ['tasks', 'tasks.deliveries']
    });
    task == null
      ? response.status(StatusCode.NOT_FOUND).json({})
      : response.status(StatusCode.OK).json({ tasks: task.tasks });
  };

  login = async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const volunteerUser = await this.VolunteerRepository.findOne({ where: { email } });

    // User not found
    if (!volunteerUser)
      return response
        .status(StatusCode.NOT_FOUND)
        .json({ message: 'User not found' });

    if (await bcrypt.compare(password, volunteerUser.password)) {
      const token = jwt.sign(
        { email: email },
        TOKEN_KEY,
        {
          expiresIn: '2h'
        }
      );
      // Login successful
      return response.status(StatusCode.OK).json({ token: token });
    } else {
      // Wrong password
      return response
        .status(StatusCode.UNAUTHORIZED)
        .json({ message: 'Invalid Credentials' });
    }
  };
}
