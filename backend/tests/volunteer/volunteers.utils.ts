import { Repository } from 'typeorm';
import { DayOfWeek, VolunteerEntity } from '../../src/entities/VolunteerEntity';

export default class VolunteerEntityHelper {
  VolunteerRepository: Repository<VolunteerEntity>;

  constructor(repository: Repository<VolunteerEntity>) {
    this.VolunteerRepository = repository;
  }

  createVolunteer = async (
    username: string,
    name: string,
    email: string,
    password: string,
    phoneNumber: number,
    startDate: string,
    profilePicture: string,
    availabilities: DayOfWeek[]
  ) => {
    const newVolunteer = new VolunteerEntity();
    newVolunteer.username = username;
    newVolunteer.email = email;
    newVolunteer.name = name;
    newVolunteer.password = password;
    newVolunteer.startDate = new Date(startDate);
    newVolunteer.phoneNumber = phoneNumber;
    newVolunteer.profilePicture = profilePicture;
    newVolunteer.availabilities = availabilities;
    return await this.VolunteerRepository.save(newVolunteer);
  };
}
