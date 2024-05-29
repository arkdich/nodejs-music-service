import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'favorite', database: 'music_service' })
export class FavoriteEntity {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  public id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  public userId: string;

  @Column({ name: 'artists', type: 'uuid', array: true })
  public artists: string[];

  @Column({ name: 'albums', type: 'uuid', array: true })
  public albums: string[];

  @Column({ name: 'tracks', type: 'uuid', array: true })
  public tracks: string[];

  constructor(data: Partial<FavoriteEntity>) {
    Object.assign(this, data);
  }
}
