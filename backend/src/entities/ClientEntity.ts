import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from './UserEntity';

@Entity()
export class ClientEntity extends UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  phoneNumber: Number;

  @Column()
  notes: string;
}
