import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { UserEntity } from '../entities/UserEntity';

export class AdminController {
  private UserRepository = AppDataSource.getRepository(UserEntity);

  getAllUsers = async (request: Request, response: Response) => {
    try {
      const users = await this.UserRepository.find();
      response.status(200).json({ users });
    } catch (e) {
      console.log(e);
      response.status(400);
    }
  };

  createUser = async (request: Request, response: Response) => {
    try {
      const user = await this.UserRepository.save(request.body);
      response.status(200).json({ user });
    } catch (e) {
      console.log(e);
      response.status(400);
    }
  };

  deleteUser = async (request: Request, response: Response) => {
    try {
      const userToDelete = await this.UserRepository.findOneBy({
        username: request.params.username
      });
      if (userToDelete == null)
        throw new Error('The user to delete does not exist');
      const user = await this.UserRepository.delete(userToDelete);
      response.status(200).json({ user });
    } catch (e) {
      console.log('Error:', e);
      response.status(400);
    }
  };
}
