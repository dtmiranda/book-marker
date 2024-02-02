import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard'

@Controller('users')
export class UserController {

  @UseGuards(JwtGuard)
  @Get('me')
  getMe() {
    return 'user profile'
  }
}
