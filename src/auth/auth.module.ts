import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthServive } from "./auth.service";

@Module({
  controllers:[AuthController],
  providers:[AuthServive]
})
export class AuthModule{

}