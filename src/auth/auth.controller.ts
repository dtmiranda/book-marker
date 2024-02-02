import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthServive } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthServive) { }

  @Post('signup')
  signup(@Body() authDto: AuthDto) {
    return this.authService.singnup(authDto)
  }


  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() authDto: AuthDto) {

    return this.authService.signin(authDto)
  }



}