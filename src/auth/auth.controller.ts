import { Body, Controller, Post } from "@nestjs/common";
import { AuthServive } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthServive) { }

  @Post('signup')
  signup(@Body() authDto: AuthDto) {
    return this.authService.singnup(authDto)
  }

  @Post('signin')
  signin(@Body() authDto: AuthDto) {
    console.log({ authDto })

    return this.authService.signin(authDto)
  }



}