import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MealDeliveryEntity } from "./MealDelivery";

@Entity()
export class TaskEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	deliveryTime: Date;

    @Column()
    isCompleted: boolean;

    @OneToMany(() => MealDeliveryEntity, (delivery) => delivery.task)
    deliveries: MealDeliveryEntity[];
}