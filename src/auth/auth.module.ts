import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from "./auth.controller";
import { AuthServive } from "./auth.service";
import { JwtStrategy } from "./strategy";

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthServive, JwtStrategy]
})
export class AuthModule {

}