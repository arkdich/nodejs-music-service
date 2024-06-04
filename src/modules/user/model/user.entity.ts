import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'users', database: 'music_service' })
export class UserEntity {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
  })
  public id: string;

  @Column({ name: 'login', type: 'varchar' })
  public login: string;

  @Column({ name: 'email', type: 'varchar' })
  public email: string;

  @Column({ name: 'is_active', type: 'boolean' })
  public isActive: boolean;

  @Column({ name: 'password', type: 'varchar' })
  @Exclude()
  public password: string;

  @Column({ name: 'version', type: 'int' })
  public version: number;

  @Column({ name: 'created_at', type: 'time with time zone' })
  public createdAt: number;

  @Column({ name: 'updated_at', type: 'time with time zone' })
  public updatedAt: number;

  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
  }
}
