import { Request, Response } from 'express';

import { AppDataSource } from '../../data-source';
import { VolunteerEntity } from '../../entities/VolunteerEntity';

export class VolunteerController {
  private VolunteerRepository = AppDataSource.getRepository(VolunteerEntity);

  getPersonalInformation = async (req: Request, res: Response) => {
    try {
      const volunteer = await this.VolunteerRepository.findOneBy({
        id: parseInt(req.params.id)
      });

      res.status(200).json({
        id: volunteer.id,
        username: volunteer.username,
        name: volunteer.name,
        email: volunteer.email,
        phoneNumber: volunteer.phoneNumber,
        startDate: volunteer.startDate,
        profilePicture: volunteer.profilePicture
      });
    } catch (error) {
      res.status(400).json({
        error
      });
    }
  };

  updatePersonalInformation = async (req: Request, res: Response) => {
    try {
      const newProperties = req.body;
      const volunteerToUpdate = await this.VolunteerRepository.findOneBy({
        id: parseInt(req.params.id)
      });

      const volunteer = await this.VolunteerRepository.save({
        ...volunteerToUpdate,
        ...newProperties
      });

      res.status(200).json({
        volunteer
      });
    } catch (error) {
      res.status(400).json({
        error
      });
    }
  };
}
