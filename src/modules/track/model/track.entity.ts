import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'track', database: 'music_service' })
export class TrackEntity {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  public id: string;

  @Column({ name: 'name', type: 'varchar' })
  public name: string;

  @Column({ name: 'artist_id', type: 'uuid', nullable: true })
  public artistId: string | null;

  @Column({ name: 'album_id', type: 'uuid', nullable: true })
  public albumId: string | null;

  @Column({ name: 'duration', type: 'integer' })
  public duration: number;

  @Column({ name: 'created_at', type: 'time with time zone' })
  public createdAt: number;

  @Column({ name: 'updated_at', type: 'time with time zone' })
  public updatedAt: number;

  constructor(data: Partial<TrackEntity>) {
    Object.assign(this, data);
  }
}
