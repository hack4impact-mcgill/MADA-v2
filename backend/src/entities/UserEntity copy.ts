import { Column, Entity, PrimaryColumn } from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity()
export class AdminEntity extends UserEntity {
  @Column()
  jobTitleColumn: string;
}
