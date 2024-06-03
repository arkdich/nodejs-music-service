import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ChangePasswordDto, LoginDto } from './model/auth.dto';
import { AuthService } from './auth.service';
import { PublicRoute } from 'src/shared/decorators/PublicRoute';
import { Jwt } from 'src/shared/decorators/Jwt';
import { UserJwt } from './model/auth.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicRoute()
  @Post('login')
  async login(@Body() data: LoginDto) {
    const tokens = await this.authService.login(data);

    return tokens;
  }

  // @PublicRoute()
  // @Patch('password/reset')
  // async resetPassword() {}

  @Post('password/change')
  @HttpCode(HttpStatus.OK)
  async changePassword(@Body() data: ChangePasswordDto, @Jwt() user: UserJwt) {
    await this.authService.changePassword(user.id, data);
  }

  @Get('profile')
  async getProfile(@Jwt() user: UserJwt) {
    const profile = await this.authService.getProfile(user.id);

    return profile;
  }
}
