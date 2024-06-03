import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './model/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    const tokens = await this.authService.login(data);

    return tokens;
  }
}
