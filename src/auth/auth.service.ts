import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthServive{

  signin() {
    return "hello im singin"
  }

  singnup() {
    return "And im signup"
  }
}