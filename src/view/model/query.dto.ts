import { IsString } from 'class-validator';

export class ResetPaswordDto {
  @IsString()
  token: string;
}
