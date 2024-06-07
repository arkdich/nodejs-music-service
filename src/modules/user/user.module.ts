import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './model/user.entity';
import { AuthService } from '../auth/auth.service';
import { MailService } from 'src/shared/servises/MailService';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, AuthService, MailService],
  exports: [UserService],
})
export class UserModule {}
