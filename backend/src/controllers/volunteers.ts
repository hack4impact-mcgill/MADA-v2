import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { VolunteerEntity } from '../entities/VolunteerEntity';
// import { TaskEntity } from '../entities/TaskEntity';
import { StatusCode } from './statusCode';

export default class VolunteerController {
  private VolunteerRepository = AppDataSource.getRepository(VolunteerEntity);
  getVolunteers = async (request: Request, response: Response) => {
    const volunteers = await this.VolunteerRepository.find();
    response.status(StatusCode.OK).json({ volunteers: volunteers });
  };

  getVolunteer = async (request: Request, response: Response) => {
    const volunteer = await this.VolunteerRepository.findOne({
      where: { id: parseInt(request.params.id) }
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
        username: request.body.username,
        password: request.body.password,
        email: request.body.email,
        phoneNumber: request.body.phoneNumber,
        startDate: new Date(),
        profilePicture: "",
        availabilities: []
    });
    await this.VolunteerRepository.save(volunteer)
    response.status(StatusCode.OK).json({volunteer});
  };

  
  editVolunteer = async (request: Request, response: Response) => {
    const volunteer = await this.VolunteerRepository.update({id: parseInt(request.params.id)}, request.body);
    response.status(StatusCode.OK).json({volunteer});
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
  // private MealDeliveryRepository =
  //   AppDataSource.getRepository();

  // getTask = async (request: Request, response: Response) => {
  //   const task = await this.TaskRepository.findOne({
  //     where: {
  //       id: parseInt(request.params.id)
  //     },
  //     relations: {
  //       deliveries: true
  //     }
  //   });
  //   task
  //     ? response.status(StatusCode.OK).json({ task: task })
  //     : response.status(StatusCode.BAD_REQUEST).json({ task: null });
  // };

  // createTask = async (request: Request, response: Response) => {
  //   const newTask = new TaskEntity();
  //   newTask.deliveryTime = new Date(request.body.date);
  //   newTask.deliveries = [];
  //   newTask.isCompleted = request.body.isCompleted;
  //   const savedTask = await this.TaskRepository.save(newTask);
  //   response.status(StatusCode.OK).json({ task: savedTask });
  // };

  // updateOrCreateTask = async (request: Request, response: Response) => {
  //   // create
  //   if (!request.params.id) {
  //     const newTask = new TaskEntity();
  //     newTask.deliveryTime = new Date(request.body.deliveryTime);
  //     newTask.deliveries = [];
  //     newTask.isCompleted = request.body.isCompleted;
  //     newTask.deliveries = await Promise.all(
  //       request.body.deliveries.map(async (d) =>
  //         this.MealDeliveryRepository.findOneBy({
  //           id: parseInt(d.id)
  //         })
  //       )
  //     );
  //     await this.TaskRepository.save(newTask);
  //     const savedTask = await this.TaskRepository.findOne({
  //       where: {
  //         id: newTask.id
  //       },
  //       relations: {
  //         deliveries: true
  //       }
  //     });
  //     response.status(StatusCode.OK).json({ task: savedTask });
  //   } else {
  //     // update
  //     const taskToUpdate = await this.TaskRepository.findOneBy({
  //       id: parseInt(request.params.id)
  //     });
  //     taskToUpdate.deliveryTime = new Date(request.body.deliveryTime);
  //     taskToUpdate.isCompleted = request.body.isCompleted;
  //     taskToUpdate.deliveries = await Promise.all(
  //       request.body.deliveries.map(async (d) =>
  //         this.MealDeliveryRepository.findOneBy({
  //           id: parseInt(d.id)
  //         })
  //       )
  //     );
  //     const updatedTask = await this.TaskRepository.save(taskToUpdate);
  //     const savedTask = await this.TaskRepository.findOne({
  //       where: {
  //         id: updatedTask.id
  //       },
  //       relations: {
  //         deliveries: true
  //       }
  //     });
  //     response.status(StatusCode.OK).json({ task: savedTask });
  //   }
  // };

  // deleteTask = async (request: Request, response: Response) => {
  //   const taskDeleted = await this.TaskRepository.delete({
  //     id: parseInt(request.params.id)
  //   });
  //   response.status(StatusCode.OK).json({});
  // };
}
