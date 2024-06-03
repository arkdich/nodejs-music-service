import {
  Body,
  Controller,
  Delete,
  Get,
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

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
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
        `Пользователь ${body.login} уже существует`,
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

    await this.userService.update(id, newPassword);
  }
}
