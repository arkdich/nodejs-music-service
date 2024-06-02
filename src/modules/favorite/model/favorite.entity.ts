import { AlbumEntity } from 'src/modules/album/model/album.entity';
import { ArtistEntity } from 'src/modules/artist/model/artist.entity';
import { TrackEntity } from 'src/modules/track/model/track.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  schema: 'public',
  name: 'favorite_artist',
  database: 'music_service',
})
export class FavoriteArtistEntity {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  public id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  public userId: string;

  @Column({ name: 'artist_id', type: 'uuid', array: true })
  public artistId: string;

  constructor(data: Partial<FavoriteArtistEntity>) {
    Object.assign(this, data);
  }
}

@Entity({
  schema: 'public',
  name: 'favorite_album',
  database: 'music_service',
})
export class FavoriteAlbumEntity {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  public id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  public userId: string;

  @Column({ name: 'album_id', type: 'uuid', array: true })
  public albumId: string;

  constructor(data: Partial<FavoriteAlbumEntity>) {
    Object.assign(this, data);
  }
}

@Entity({
  schema: 'public',
  name: 'favorite_track',
  database: 'music_service',
})
export class FavoriteTrackEntity {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  public id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  public userId: string;

  @Column({ name: 'track_id', type: 'uuid', array: true })
  public trackId: string;

  constructor(data: Partial<FavoriteTrackEntity>) {
    Object.assign(this, data);
  }
}

export type FavoritesResponse = {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}[];
