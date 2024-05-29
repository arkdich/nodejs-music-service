import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './model/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity]), TrackModule, AlbumModule],
  exports: [ArtistService],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
