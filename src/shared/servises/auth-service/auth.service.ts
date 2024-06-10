import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../modules/user/model/user.entity';
import { compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { config } from 'dotenv';
import { UserJwt } from '../../model/types/auth.type';

config({ path: ['.env.local'] });

@Injectable()
export class AuthService {
  private static instance: AuthService | null = null;

  @InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>;

  constructor(private jwtService: JwtService) {
    if (AuthService.instance) {
      return AuthService.instance;
    }

    AuthService.instance = this;
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

  async validateToken(type: 'access' | 'refresh' | 'reset', token: string) {
    const JWT_SECRETS = {
      access: process.env.JWT_SECRET_KEY,
      refresh: process.env.JWT_SECRET_REFRESH_KEY,
      reset: process.env.JWT_SECRET_RESET_KEY,
    };

    try {
      const payload: UserJwt = await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRETS[type],
      });

      return payload;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
