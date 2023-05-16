import {
  Column,
  PrimaryColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { TaskEntity } from './TaskEntity';
import { UserEntity } from './UserEntity';

export enum DayOfWeek {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday'
}

export enum TimeSlots {
  hour0 = '12:00PM',
  hour1 = '01:00PM',
  hour2 = '02:00PM',
  hour3 = '03:00PM',
  hour4 = '04:00PM',
  hour5 = '05:00PM'
}

export interface Availability {
  day: DayOfWeek;
  time: TimeSlots;
}

export interface availabilities {
  availabilities: Availability[];
}

@Entity()
export class VolunteerEntity extends UserEntity {
  @Column()
  startDate: Date;

  @Column()
  profilePicture: string;

  @Column()
  availabilities: string;

  @OneToMany(() => TaskEntity, (task) => task.volunteer)
  tasks: TaskEntity[];

  // Account info
  @Column()
  password: string;

  @Column({ nullable: true })
  token: string;
}
