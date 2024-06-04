import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ChangePasswordDto, LoginDto } from './model/auth.dto';
import { AuthService } from './auth.service';
import { PublicRoute } from 'src/shared/decorators/PublicRoute';
import { Jwt } from 'src/shared/decorators/Jwt';
import { UserJwt } from './model/auth.type';
import { MailService } from 'src/shared/servises/MailService';
import { getTemplateHtml } from 'src/shared/templates/get-template';
import { CreateUserDto } from '../user/model/user.dto';
import { UserService } from '../user/user.service';
import { config } from 'dotenv';

config({ path: ['.env.local'] });

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailService: MailService,
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
    try {
      const user = await this.userService.add(data);
      const tokens = await this.authService.generateTokens({
        id: user.id,
        login: user.login,
      });

      const activationLink = `${process.env.API_HOST}:${process.env.PORT_API}/auth/activate/${tokens.refreshToken}`;

      const html = getTemplateHtml('ActivateAccount', {
        link: activationLink,
      });

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.SMTP_USER,
        subject: 'Активация аккаунта',
        html,
      };

      this.mailService.sendMail(mailOptions);

      return tokens;
    } catch (err) {
      throw new HttpException(
        `${data.email} или ${data.login} уже существуют`,
        HttpStatus.CONFLICT,
      );
    }
  }

  // @PublicRoute()
  // @Patch('activate/:token')
  // async activateUser() {}

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
