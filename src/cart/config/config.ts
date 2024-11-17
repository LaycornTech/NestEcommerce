import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Cart } from "../entities/cart.entity";
import { CartDetails } from "../entities/cartdetails.entity";
// import Category from "../entities/category.entities";
import { Order } from "../entities/order.entity";
import { Product } from "../entities/product.entity";
import { User } from "../entities/user.entity";
import Category from "../entities/category.entity";
import { join } from "path";


export default class TypeOrmConfig{

    static getOrmConfig(configservice: ConfigService): TypeOrmModuleOptions{

        return{
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "12345",
            database:"carts",
            entities: [Cart, CartDetails, Category, Order, Product, User],
            synchronize: true,
            logging: true

            // type: "postgres",
            //         host: configservice.get("DB_HOST"),
            //         port: +configservice.get("DB_PORT"),
            //         username:configservice.get("DB_USERNAME"),
            //         // password: configservice.get("DB_PASSWORD"),
            //         database:configservice.get("DB_NAME"),
            //         entities: [join(process.cwd(), 'dist/**/*.entity.js')],
            //         synchronize: true,
            //         logging: true
        



        }
    }
}

export const cartormAsync: TypeOrmModuleAsyncOptions ={
    useFactory: async (configservice: ConfigService): Promise<TypeOrmModuleOptions> => 
    TypeOrmConfig.getOrmConfig(configservice),
    imports: [ConfigModule],
    inject: [ConfigService]
}