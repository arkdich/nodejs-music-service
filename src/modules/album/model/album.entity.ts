import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'album', database: 'music_service' })
export class AlbumEntity {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  public id: string;

  @Column({ name: 'name', type: 'varchar' })
  public name: string;

  @Column({ name: 'year', type: 'integer' })
  public year: number;

  @Column({ name: 'artist_id', type: 'varchar', nullable: true })
  public artistId: string | null;

  constructor(data: Partial<AlbumEntity>) {
    Object.assign(this, data);
  }
}
