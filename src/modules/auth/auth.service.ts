import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ChangePasswordDto,
  LoginDto,
  PasswordResetDto,
} from './model/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/model/user.entity';
import { compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { config } from 'dotenv';
import { UserService } from '../user/user.service';
import { UserJwt } from './model/auth.type';
import { SendMailOptions } from 'nodemailer';
import { MailService } from 'src/shared/servises/MailService';
import { CreateUserDto } from '../user/model/user.dto';
import { getTemplateHtml } from 'src/shared/templates/get-template';

config({ path: ['.env.local'] });

@Injectable()
export class AuthService {
  private static instance: AuthService | null = null;

  @InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>;

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private mailService: MailService,
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
      email: user.email,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async regisrer(data: CreateUserDto) {
    try {
      const user = await this.userService.add(data);
      const tokens = await this.generateTokens({
        id: user.id,
        login: user.login,
        email: user.email,
      });

      const activationLink = `${process.env.API_HOST}:${process.env.PORT_API}/user/activate/${tokens.refreshToken}`;

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
        `Пользователь с данными ${data.email} или ${data.login} уже существует`,
        HttpStatus.CONFLICT,
      );
    }
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

    await this.userService.updatePassword(user.id, password);
  }

  async generateResetLink(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new HttpException(
        `Пользователь с email ${email} не найден`,
        HttpStatus.NOT_FOUND,
      );
    }

    const resetTokem = await this.jwtService.signAsync(
      { sub: user.id, email: user.email },
      { secret: process.env.JWT_SECRET_RESET_KEY },
    );

    const resetLink = `${process.env.API_HOST}:${process.env.PORT_API}/view/password-reset?token=${resetTokem}`;

    const mailOptions: SendMailOptions = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: 'Сброс пароля',
      html: `<p style="font-size:18px">Для сброса пароля перейдите по <a href=${resetLink}>ссылке</a></p>`,
    };

    await this.mailService.sendMail(mailOptions);
  }

  async resetPassword(data: PasswordResetDto) {
    let sub = '';

    try {
      const payload = await this.jwtService.verifyAsync(data.token, {
        secret: process.env.JWT_SECRET_RESET_KEY,
      });

      sub = payload.sub;
    } catch (err) {
      throw new UnauthorizedException();
    }

    if (data.password !== data.passwordConfirm) {
      throw new HttpException('Пароли не совпадают', HttpStatus.BAD_REQUEST);
    }

    await this.userService.updatePassword(sub, data.password);
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
    email,
  }: Partial<Pick<UserEntity, 'id' | 'login' | 'email'>>) {
    const tokenPayload = {
      id,
      login,
      email,
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

  async validateAccessToken(token: string) {
    try {
      const payload: UserJwt = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      return payload;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async validateRefreshToken(token: string) {
    try {
      const payload: UserJwt = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      return payload;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async validateResetToken(token: string) {
    try {
      const payload: UserJwt = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_RESET_KEY,
      });

      return payload;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
