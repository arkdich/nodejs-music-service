import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TrackModule } from './modules/track/track.module';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { TypeOrmSettings } from './database/config.db';

@Module({
  imports: [
    TypeOrmSettings,
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoriteModule,
  ],
})
export class AppModule {}
