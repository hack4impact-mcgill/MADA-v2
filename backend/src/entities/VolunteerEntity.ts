import {
  Column,
  PrimaryColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { TaskEntity } from './TaskEntity';
import { UserEntity } from './UserEntity';
import { Neighbourhood } from './types';

export enum DayOfWeek {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday'
}

// Assign explicit numeric values - for seeding purposes
export const indexedDayOfWeek: { [index: number]: DayOfWeek } = {
  0: DayOfWeek.MONDAY,
  1: DayOfWeek.TUESDAY,
  2: DayOfWeek.WEDNESDAY,
  3: DayOfWeek.THURSDAY,
  4: DayOfWeek.FRIDAY,
  5: DayOfWeek.SATURDAY,
  6: DayOfWeek.SUNDAY
};

export enum TimeSlots {
  hour0 = '12:00PM',
  hour1 = '01:00PM',
  hour2 = '02:00PM',
  hour3 = '03:00PM',
  hour4 = '04:00PM',
  hour5 = '05:00PM'
}

// Assign explicit numeric values - for seeding purposes
export const indexedTimeSlots: { [index: number]: TimeSlots } = {
  0: TimeSlots.hour0,
  1: TimeSlots.hour1,
  2: TimeSlots.hour2,
  3: TimeSlots.hour3,
  4: TimeSlots.hour4,
  5: TimeSlots.hour5
};

export interface Availability {
  day: DayOfWeek;
  time: string;
}

export interface Availabilities {
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

  @Column()
  availabilitiesLastUpdated: Date;

  @OneToMany(() => TaskEntity, (task) => task.volunteer, {
    cascade: true
  })
  tasks: TaskEntity[];

  @Column({ nullable: true })
  token: string;

  @Column('text', { nullable: true, array: true })
  preferredNeighbourhoods: Neighbourhood[];
}
