import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartDetails } from "./cartdetails.entity";
import { isDelivered, isPaid } from "../constants/constants";

@Entity()
export class Order {
    @PrimaryGeneratedColumn({type:"bigint"})
    id:number;

    @Column({type: "bigint"})
    userId: number;

    @Column({type: "bigint"})
    current_total: number;

    @Column({type: "enum", enum: isPaid})
    paid_for: isPaid;

    @Column({type:"enum", enum: isDelivered})
    isDelivered: isDelivered;

    @OneToMany(()=> CartDetails, (cartdetails)=> cartdetails.order)
    cartdetails: CartDetails;
}