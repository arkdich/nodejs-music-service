import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/modules/album/model/album.entity';
import { ArtistEntity } from 'src/modules/artist/model/artist.entity';
import { FavoriteEntity } from 'src/modules/favorite/model/favorite.entity';
import { TrackEntity } from 'src/modules/track/model/track.entity';
import { UserEntity } from 'src/modules/user/model/user.entity';

export const PORT_DB = Number(process.env.PORT_DB);

export const TypeOrmSettings = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: PORT_DB,
  username: 'artesha',
  password: 'pswd',
  database: 'music_service',
  entities: [
    UserEntity,
    ArtistEntity,
    TrackEntity,
    AlbumEntity,
    FavoriteEntity,
  ],
  synchronize: false,
  logging: true,
});
