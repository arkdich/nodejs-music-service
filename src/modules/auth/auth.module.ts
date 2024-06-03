import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/model/user.entity';
import { UserModule } from '../user/user.module';

config({ path: ['.env.local'] });

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
