import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity()
export class VolunteerEntity extends UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneNumber: number;

  @Column()
  startDate: string;

  @Column()
  profilePicture: string;
}
