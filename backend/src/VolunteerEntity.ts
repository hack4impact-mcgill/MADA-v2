import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Creates an entity
// Entity is a class that maps to a database table : https://orkhan.gitbook.io/typeorm/docs/entities
@Entity()
export class Volunteer extends UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneNumber: number;

  @Column()
  startDate: string;

  @Column()
  profilePicture: string;
}
