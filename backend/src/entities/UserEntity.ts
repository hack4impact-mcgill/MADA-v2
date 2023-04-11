import { Column, Entity, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
    @PrimaryColumn()
    username: string;

    @Column()
    name: string;

    @Column({
        unique: true,
        nullable: false
    })
    email: string;

    @Column({ select: false })
    password: string;
}
