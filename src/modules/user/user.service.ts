import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './model/user.dto';
import { UserEntity } from './model/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private static instance: UserService | null = null;

  @InjectRepository(UserEntity)
  private users: Repository<UserEntity>;

  constructor() {
    if (UserService.instance) {
      return UserService.instance;
    }

    UserService.instance = this;
  }

  async add(data: CreateUserDto) {
    const userDto = new UserEntity({
      login: data.login,
      password: data.password,
    });

    const user = await this.users.save(userDto);

    return user;
  }

  async get(id: string) {
    const user = await this.users.findOneBy({ id });

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return user;
  }

  async getAll() {
    const users = await this.users.find();

    return users;
  }

  async delete(id: string) {
    await this.users.delete({ id });
  }

  async update(id: string, password: UserEntity['password']) {
    const userDto = new UserEntity({
      password,
    });

    const user = await this.users.update({ id }, userDto);

    return user;
  }
}
