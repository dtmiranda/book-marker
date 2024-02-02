import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from "./auth.controller";
import { AuthServive } from "./auth.service";

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthServive]
})
export class AuthModule {

}