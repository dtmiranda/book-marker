import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'

@Injectable()
export class AuthServive {
  constructor(private prisma: PrismaService) { }

  async singnup(authDto: AuthDto) {
    //generate the password hash
    const hash = await argon.hash(authDto.password);

    // save the new user in the db
    const user = await this.prisma.user.create({
      data: {
        email: authDto.email,
        hash,
      }
    })

    //temporaly used to prvent showing hash
    delete user.hash

    //return the saved user
    return user

    return "And im signup"
  }

  signin(authDto: AuthDto) {
    return "hello im singin"
  }


}