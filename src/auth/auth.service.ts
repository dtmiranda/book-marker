import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthServive {
  constructor(private prisma: PrismaService) { }

  signin() {
    return "hello im singin"
  }

  singnup() {
    return "And im signup"
  }
}