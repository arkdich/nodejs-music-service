import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import {
  ChangePasswordDto,
  LoginDto,
  PasswordResetDto,
  RequestPasswordResetDto,
} from './model/auth.dto';
import { AuthService } from './auth.service';
import { PublicRoute } from 'src/shared/decorators/PublicRoute';
import { Jwt } from 'src/shared/decorators/Jwt';
import { UserJwt } from './model/auth.type';
import { CreateUserDto } from '../user/model/user.dto';
import { config } from 'dotenv';
import { UserService } from '../user/user.service';

config({ path: ['.env.local'] });

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @PublicRoute()
  @Post('login')
  async login(@Body() data: LoginDto) {
    const tokens = await this.authService.login(data);

    return tokens;
  }

  @PublicRoute()
  @Post('register')
  async register(@Body() data: CreateUserDto) {
    await this.authService.regisrer(data);
  }

  @PublicRoute()
  @Get('password/reset')
  @HttpCode(HttpStatus.OK)
  async requestPasswordReset(@Query() { email }: RequestPasswordResetDto) {
    await this.authService.generateResetLink(email);
  }

  @PublicRoute()
  @Post('password/reset')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() data: PasswordResetDto) {
    await this.authService.resetPassword(data);
  }

  @Post('password/change')
  @HttpCode(HttpStatus.OK)
  async changePassword(@Body() data: ChangePasswordDto, @Jwt() user: UserJwt) {
    await this.authService.changePassword(user.id, data);
  }

  @Get('profile')
  async getProfile(@Jwt() userJwt: UserJwt) {
    const user = await this.userService.get(userJwt.id);

    return user;
  }
}
