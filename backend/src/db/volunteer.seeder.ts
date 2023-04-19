import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { VolunteerEntity } from '../entities/VolunteerEntity';
import { faker } from '@faker-js/faker';
import {generateTask} from './task.seeder';

const generateVolunteer = () => {
    const volunteer = new VolunteerEntity();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    volunteer.name =  firstName + " " + lastName;
    volunteer.username = faker.internet.userName(firstName, lastName);
    volunteer.password = faker.internet.password();
    volunteer.email = faker.internet.email(firstName, lastName);
    volunteer.startDate = faker.date.past(2)
    volunteer.profilePicture = faker.internet.avatar();
    volunteer.availabilities = [];
    volunteer.phoneNumber = faker.phone.number()
    return volunteer;
}

const generateVolunteers = (num: number) => {
    const volunteers = [];
    for (let i = 0; i < num; i++) {
        volunteers.push(generateVolunteer());
    }
    return volunteers;
}

const generateTasks = (dataSource: DataSource, volunteers: VolunteerEntity[]) => {
    volunteers.forEach(async (volunteer) => {
        const num = Math.floor(Math.random() * 4);
        for (let i = 0; i <= num; i++) {
            await generateTask(dataSource, volunteer);
        }
    })
}

export default class VolunteerSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const repository =  dataSource.getRepository(VolunteerEntity);
        const volunteers = generateVolunteers(10)
        await repository.insert(volunteers);
        generateTasks(dataSource, volunteers);
    }
}