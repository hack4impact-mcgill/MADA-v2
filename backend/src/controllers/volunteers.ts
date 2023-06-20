import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { VolunteerEntity } from '../entities/VolunteerEntity';
// import { TaskEntity } from '../entities/TaskEntity';
import { StatusCode } from './statusCode';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

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
    const task = await this.VolunteerRepository.findOne({
      where: { id: parseInt(request.params.id) },
      relations: ['tasks', 'tasks.deliveries']
    });
    task == null
      ? response.status(StatusCode.NOT_FOUND).json({})
      : response.status(StatusCode.OK).json({ tasks: task.tasks });
  };

  login = async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const repository = AppDataSource.getRepository(VolunteerEntity);
    console.log(process.env.JWT_PRIVATE_KEY);
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
}
