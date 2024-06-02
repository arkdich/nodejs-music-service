import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  FavoriteAlbumEntity,
  FavoriteArtistEntity,
  FavoriteTrackEntity,
} from './model/favorite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoriteAlbumEntity,
      FavoriteArtistEntity,
      FavoriteTrackEntity,
    ]),
    TrackModule,
    AlbumModule,
    ArtistModule,
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
