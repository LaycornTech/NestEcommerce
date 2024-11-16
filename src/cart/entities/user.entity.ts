import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { CartDetails } from "./cartdetails.entity";


@Entity({name: "user"})
export class User{

    @PrimaryGeneratedColumn({type:"bigint"})
    id: number;

    @Column({type: "varchar"})
    firstname: string;

    // @Column({type: "varchar"})
    // lastname: string;

    @Column({type: "varchar"})
    email: string;

    @Column({type: "varchar"})
    password: string;
    
    @Column({type: "varchar"})
    confirm: string;






    @OneToOne(()=> Cart, (cart)=> cart.user)
    cart: Cart;
}