import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from './UserEntity';

@Entity()
export class ClientEntity extends UserEntity {
    @Column()
    address: string;

    @Column()
    notes: string;
}
