import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { ExtractTokenMiddleware } from './shared/extractTokenMidware';
import { CartService } from './cart/cart.service';
import { SharedModule } from './shared/shared.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { cartormAsync } from './cart/config/config';
import { Cart } from './cart/entities/cart.entity';
import { CartDetails } from './cart/entities/cartdetails.entity';
import Category from './cart/entities/category.entity';
import { Order } from './cart/entities/order.entity';
import { Product } from './cart/entities/product.entity';
import { User } from './cart/entities/user.entity';
import { join } from 'path';
import { cartormAsync } from './cart/config/config';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
// import { UserController } from './user/user.controller';
// import { UserService } from './user/user.service';

@Module({
  imports: [CartModule, SharedModule, ConfigModule.forRoot(), 
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configservice: ConfigService) => ({
    //       type: "postgres",
    //         host: configservice.get("DB_HOST"),
    //         port: +configservice.get("DB_PORT"),
    //         username:configservice.get("DB_USERNAME"),
    //         password: configservice.get("DB_PASSWORD"),
    //         database:configservice.get("DB_NAME"),
    //         entities: [join(process.cwd(), 'dist/**/*.entity.js')],
    //         synchronize: true,
    //         logging: true

    //   })
    // }) 
    TypeOrmModule.forRootAsync(cartormAsync),
  //   TypeOrmModule.forRoot({
  //     type: "postgres",
  //           host: "localhost",
  //           port: 5432,
  //           username: "postgres",
  //           password: "12345",
  //           database:"carts",
  //           entities: [Cart, CartDetails, Category, Order, Product, User],
  //           synchronize: true,
  //           logging: true
  //   })
  ],
  controllers: [AppController, 
    UserController
  ],
  providers: [AppService, CartService,
    UserService
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(ExtractTokenMiddleware).forRoutes("*");
      // .exclude("/user/*")
  }
}
// export class AppModule{}

