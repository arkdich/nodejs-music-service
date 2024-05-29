import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TrackModule } from '../track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './model/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity]), TrackModule],
  exports: [AlbumService],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
