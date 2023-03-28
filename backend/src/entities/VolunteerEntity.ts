import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

@Entity()
export class VolunteerEntity extends UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneNumber: number;

  @Column()
  startDate: Date;

  @Column()
  profilePicture: string;

  @Column('text', { array: true })
  availabilities: DayOfWeek[];
}
