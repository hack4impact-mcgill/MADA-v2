import { Repository } from 'typeorm';
import { TaskEntity } from '../../src/entities/TaskEntity';
import { DayOfWeek, VolunteerEntity } from '../../src/entities/VolunteerEntity';

export default class VolunteerEntityHelper {
  VolunteerRepository: Repository<VolunteerEntity>;

  constructor(repository: Repository<VolunteerEntity>) {
    this.VolunteerRepository = repository;
  }

  createVolunteer = async (
    name: string,
    email: string,
    phoneNumber: string,
    password: string,
    startDate: string,
    profilePicture: string,
    availabilities: string,
    tasks: TaskEntity[]
  ) => {
    const newVolunteer = new VolunteerEntity();
    newVolunteer.email = email;
    newVolunteer.phoneNumber = phoneNumber;
    newVolunteer.name = name;
    newVolunteer.password = password;
    newVolunteer.startDate = new Date(startDate);
    newVolunteer.profilePicture = profilePicture;
    newVolunteer.availabilities = availabilities;
    newVolunteer.tasks = tasks;
    return await this.VolunteerRepository.save(newVolunteer);
  };
}
