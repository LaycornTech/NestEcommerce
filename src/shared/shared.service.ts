import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
// import { compare, hash } from 'bcryptjs';
import { verify } from 'jsonwebtoken';
import { AuthenticationId } from 'src/lib/types';

@Injectable()
export class SharedService {

        constructor(private config: ConfigService, private jwtservice: JwtService){}
    // for hashing password
    // async hashPassword(data: string){
    //     const saltRounds = Number(this.config.get("HASH_SALT_ROUNDS") || 10);
    //     const hashing = await hash(data, saltRounds);
    //     return hashing
    // }

    async verifyJwt(token:string): Promise<Record<string, unknown>> {
        const payload = await this.jwtservice.verify(token, {secret: "thisisthesecret"});
        return payload
    }

    // signPayload(
    //     dataload: string | Buffer | AuthenticationId){
    //     const stringifiedPayload = typeof dataload === "string" ? dataload : JSON.stringify(dataload);
    //     const token = this.jwtservice.sign(stringifiedPayload, {secret: "thisisthesecret"});
    //     return token;
    // }

    // async comparePassword(password: string, hashedPassword: string){
    //     const isPasswordCorrect = await compare(password, hashedPassword)
    //     return isPasswordCorrect
    // }

}
