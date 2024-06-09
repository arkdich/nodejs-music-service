import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './model/user.dto';
import { UserService } from './user.service';
import { UserEntity } from './model/user.entity';
import { AuthService } from '../auth/auth.service';
import { PublicRoute } from 'src/shared/decorators/PublicRoute';
import { getTemplateHtml } from 'src/shared/templates/get-template';
import { JwtService } from '@nestjs/jwt';
import { UserJwt } from '../auth/model/auth.type';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Get(':id')
  async get(@Param('id', new ParseUUIDPipe()) id: string): Promise<UserEntity> {
    const user = await this.userService.get(id);

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Get()
  async getAll(): Promise<UserEntity[]> {
    const users = await this.userService.getAll();

    return users;
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<UserEntity> {
    try {
      const user = await this.userService.add(body);

      return user;
    } catch (err) {
      throw new HttpException(
        `Пользователь с данными ${body.email} или ${body.login} уже существует`,
        HttpStatus.CONFLICT,
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.userService.delete(id);
    } catch (err) {
      throw err;
    }
  }

  @Patch(':id/password')
  @HttpCode(HttpStatus.OK)
  async updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    await this.authService.validateUser({ id, password: oldPassword });

    await this.userService.updatePassword(id, newPassword);
  }

  @PublicRoute()
  @Get('activate/:token')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'text/html')
  async activateUser(@Param('token') token: string) {
    let email = '';
    let success = false;

    try {
      const user = await this.authService.validateToken('refresh', token);

      await this.userService.activateUser(user.sub);

      email = user.email;
      success = true;
    } catch (err) {
      const payload = this.jwtService.decode<UserJwt>(token);

      email = payload.email;
      success = false;
    } finally {
      const html = getTemplateHtml('AccountActivated', {
        email,
        success,
      });

      return html;
    }
  }
}
