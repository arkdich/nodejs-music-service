import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './model/auth.dto';
import { AuthService } from './auth.service';
import { PublicRoute } from 'src/shared/decorators/PublicRoute';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicRoute()
  @Post('login')
  async login(@Body() data: LoginDto) {
    const tokens = await this.authService.login(data);

    return tokens;
  }
}
