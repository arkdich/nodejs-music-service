import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TrackModule } from './modules/track/track.module';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { TypeOrmSettings } from './config.db';
import { AuthGuard } from './shared/guards/AuthGuard';
import { ViewModule } from './view/view.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmSettings,
    JwtModule.register({
      global: true,
    }),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoriteModule,
    ViewModule,
  ],
  providers: [{ provide: 'APP_GUARD', useClass: AuthGuard }],
})
export class AppModule {}
