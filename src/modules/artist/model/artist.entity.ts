import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'artist', database: 'music_service' })
export class ArtistEntity {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  public id: string;

  @Column({ name: 'name', type: 'varchar' })
  public name: string;

  @Column({ name: 'grammy', type: 'boolean' })
  public grammy: boolean;

  constructor(data: Partial<ArtistEntity>) {
    Object.assign(this, data);
  }
}
