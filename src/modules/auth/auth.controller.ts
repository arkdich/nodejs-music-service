import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
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
import { Response } from 'express';
import ms from 'ms';

config({ path: ['.env.local'] });

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @PublicRoute()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(data);

    res.cookie('REFRESH_TOKEN', refreshToken, {
      maxAge: ms(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN),
      httpOnly: true,
    });

    return { accessToken };
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
    await this.authService.changePassword(user.sub, data);
  }

  @Get('profile')
  async getProfile(@Jwt() userJwt: UserJwt) {
    const user = await this.userService.get(userJwt.sub);

    return user;
  }
}
