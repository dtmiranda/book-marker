import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthServive {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async singnup(authDto: AuthDto) {
    //generate the password hash
    const hash = await argon.hash(authDto.password);

    // save the new user in the db
    try {

      const user = await this.prisma.user.create({
        data: {
          email: authDto.email,
          hash,
        }
      })

      //temporaly used to prevent showing hash
      delete user.hash

      //return the saved user
      return user

    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken')
        }
      }

      throw error
    }
  }

  async signin(authDto: AuthDto) {
    //find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: authDto.email
      }
    })

    //if does not exist thrw exception
    if (!user) {
      throw new ForbiddenException('Credentials incorret')
    }

    //compare password
    const passwordMatches = await argon.verify(
      user.hash, authDto.password
    )

    //if password is incorret throw exceptional
    if (!passwordMatches) {
      throw new ForbiddenException('Credential incorret')
    }

    //send back the user 
    delete user.hash
    return user
  }


}