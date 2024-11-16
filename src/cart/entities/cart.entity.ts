import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { totalmem } from "os";
import { user } from "src/db/db";

@Entity({name: "cart"})
export class Cart{
    @PrimaryGeneratedColumn({type:"bigint"})
    id: number

    @Column({type: "bigint"})
    current_Total: number;

    // ?Foreign key One to One
    @Column({type: "bigint"})
    userId: number;    
    
    @OneToOne(()=>User, (user) => user.cart)
    user: User;
}
