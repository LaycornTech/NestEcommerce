import { IsNumber, IsString } from "class-validator";


export class createProductDto{
    @IsNumber()
    id: number

    @IsString()
    name: string;

    @IsNumber()
    categoryId: number;

    @IsNumber()
    Available_Quantity: number;
    
    @IsNumber()
    price: number;
//     @IsString()
// name:string;

// @IsString()
//     description: string
}