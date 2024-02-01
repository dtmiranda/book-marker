import { Body, Controller, Post } from "@nestjs/common";
import { AuthServive } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthServive) { }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    console.log({ dto })

    return this.authService.signin()
  }

  @Post('signup')
  signup() {
    return this.authService.singnup()
  }

}