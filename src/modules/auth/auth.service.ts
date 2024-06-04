import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ChangePasswordDto, LoginDto } from './model/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/model/user.entity';
import { compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { config } from 'dotenv';
import { UserService } from '../user/user.service';

config({ path: ['.env.local'] });

@Injectable()
export class AuthService {
  private static instance: AuthService | null = null;

  @InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>;

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {
    if (AuthService.instance) {
      return AuthService.instance;
    }

    AuthService.instance = this;
  }

  async login({ login, password }: LoginDto) {
    const { user } = await this.validateUser({ login, password });

    const { accessToken, refreshToken } = await this.generateTokens({
      id: user.id,
      login: user.login,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async changePassword(
    userId: string,
    { currentPassword, password, passwordConfirm }: ChangePasswordDto,
  ) {
    const { user } = await this.validateUser({
      id: userId,
      password: currentPassword,
    });

    if (password !== passwordConfirm) {
      throw new HttpException('Пароли не совпадают', HttpStatus.BAD_REQUEST);
    }

    await this.userService.update(user.id, password);
  }

  async getProfile(userId: string) {
    const user = await this.userService.get(userId);

    return user;
  }

  async validateUser({
    id,
    login,
    password,
  }: Partial<Pick<UserEntity, 'id' | 'login' | 'password'>>) {
    const user = await this.userRepository.findOneBy([{ id }, { login }]);

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      throw new HttpException(
        'Текущий пароль указан неверно',
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      user,
      isValid,
    };
  }

  async generateTokens({
    id,
    login,
  }: Partial<Pick<UserEntity, 'id' | 'login'>>) {
    const tokenPayload = {
      id,
      login,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '30m',
    });

    const refreshToken = await this.jwtService.signAsync(tokenPayload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: '30d',
    });

    return { accessToken, refreshToken };
  }
}
