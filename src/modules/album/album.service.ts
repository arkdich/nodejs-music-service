import { Injectable } from '@nestjs/common';
import { AlbumEntity } from './model/album.entity';
import { AlbumDto } from './model/album.dto';
// import { TrackService } from '../track/track.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AlbumService {
  private static instance: AlbumService | null = null;

  @InjectRepository(AlbumEntity)
  private albums: Repository<AlbumEntity>;

  // @Inject(TrackService)
  // private tracks: TrackService | null = null;

  constructor() {
    if (AlbumService.instance) {
      return AlbumService.instance;
    }

    AlbumService.instance = this;
  }

  async add(data: AlbumDto) {
    const albumDto = new AlbumEntity({
      name: data.name,
      artistId: data.artistId,
      year: data.year,
    });

    const album = await this.albums.save(albumDto);

    return album;
  }

  async get(id: string) {
    const album = this.albums.findOneBy({ id });

    if (!album) {
      throw new Error(`Album with id ${id} not found`);
    }

    return album;
  }

  async getAll() {
    const albums = await this.albums.find();

    return albums;
  }

  async delete(id: string) {
    await this.albums.delete({ id });
  }

  async update(id: string, data: Partial<AlbumDto>) {
    const albumDto = new AlbumEntity({
      id,
      name: data.name,
      artistId: data.artistId,
      year: data.year,
    });

    const album = await this.albums.save(albumDto);

    return album;
  }
}
