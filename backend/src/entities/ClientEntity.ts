import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserEntity } from './UserEntity';

// Creates an entity
// Entity is a class that maps to a database table : https://orkhan.gitbook.io/typeorm/docs/entities

@Entity()
export class ClientEntity extends UserEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: Number;

  @Column()
  name: string;

  @Column()
  notes: string;
}
