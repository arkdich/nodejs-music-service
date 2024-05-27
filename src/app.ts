import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserEntity } from './modules/user/model/user.entity';

export const PORT_DB = Number(process.env.PORT_DB);
export const PORT_API = Number(process.env.PORT_API);

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const appReflector = app.get(Reflector);

  const pipes = [new ValidationPipe()];
  const interceptors = [new ClassSerializerInterceptor(appReflector)];

  app.useGlobalPipes(...pipes);
  app.useGlobalInterceptors(...interceptors);

  await app.listen(PORT_API);
};

bootstrap();

export const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: PORT_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: 'music_service',
  entities: [UserEntity],
  synchronize: true,
  logging: false,
});

appDataSource.initialize();
