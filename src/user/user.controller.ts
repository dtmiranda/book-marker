import { JwtGuard } from '../auth/guard'
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';


@Controller('users')
export class UserController {

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@Req() request: Request) {
    return request.user
  }
}
