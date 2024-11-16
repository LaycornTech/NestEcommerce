import { IsEmail, IsNumber, IsString } from "class-validator";



export class UserSignUpDto{
    @IsString()
    firstname: string;

    @IsString()
    email: string;

    @IsString()
    password: string;
    
    @IsString()
    confirm: string;
}