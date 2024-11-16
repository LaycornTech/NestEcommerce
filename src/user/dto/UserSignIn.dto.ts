import { IsEmail, IsString } from "class-validator";


export class UserSignInDto{
    @IsString()
    firstname: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

}