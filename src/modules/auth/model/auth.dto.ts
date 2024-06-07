import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}

export class ChangePasswordDto {
  @IsString()
  currentPassword: string;

  @IsString()
  password: string;

  @IsString()
  passwordConfirm: string;
}

export class RequestPasswordResetDto {
  @IsEmail()
  email: string;
}

export class PasswordResetDto {
  @IsString()
  token: string;

  @IsString()
  password: string;

  @IsString()
  passwordConfirm: string;
}
