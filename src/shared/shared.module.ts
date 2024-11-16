import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({

    imports: [ConfigModule, JwtModule.registerAsync({
        async useFactory(){
            return{
                signOptions: {expiresIn: '8h'}, secret: "thisisthesecret"}
            }})],
    providers: [SharedService, ConfigService, JwtService], 
    // Ensure all services(e.g ConfigService, JwtService) used in a service (e.g SharedService) are providers 
    // and export them as well

    exports: [SharedService, JwtService]
})
export class SharedModule {}
