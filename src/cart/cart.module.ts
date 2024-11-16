import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Product } from './entities/product.entity';
import { DataSource } from 'typeorm';

@Module({
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature()]
})
export class CartModule {}
