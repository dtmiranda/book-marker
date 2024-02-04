import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) { }
  async editUser(
    userId: number,
    dto: EditUserDto,
  ) {
    const user = await this.prismaService.user.update({
      where: {
        id: userId
      },
      data: {
        ...dto
      },
    });

    delete user.hash
    return user
  }
}
