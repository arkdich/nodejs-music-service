import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/modules/album/model/album.entity';
import { ArtistEntity } from 'src/modules/artist/model/artist.entity';
import {
  FavoriteAlbumEntity,
  FavoriteArtistEntity,
  FavoriteTrackEntity,
} from 'src/modules/favorite/model/favorite.entity';
import { TrackEntity } from 'src/modules/track/model/track.entity';
import { UserEntity } from 'src/modules/user/model/user.entity';
import { config } from 'dotenv';

config({
  path: ['.env.local'],
});

const PORT_DB = Number(process.env.PORT_DB);
const DB_HOST = process.env.DB_HOST;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;

if (!PORT_DB || !POSTGRES_USER || !POSTGRES_PASSWORD) {
  throw new Error(
    'Missing environment variables for database configuration, make sure .env.local is properly configured',
  );
}

export const TypeOrmSettings = TypeOrmModule.forRoot({
  type: 'postgres',
  host: DB_HOST,
  port: PORT_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: 'music_service',
  entities: [
    UserEntity,
    ArtistEntity,
    TrackEntity,
    AlbumEntity,
    FavoriteArtistEntity,
    FavoriteAlbumEntity,
    FavoriteTrackEntity,
  ],
  synchronize: false,
  logging: true,
});
