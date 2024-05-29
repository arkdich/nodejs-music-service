import { Injectable } from '@nestjs/common';
import { ArtistDto } from './model/artist.dto';
import { ArtistEntity } from './model/artist.entity';
// import { TrackService } from '../track/track.service';
// import { AlbumService } from '../album/album.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  private static instance: ArtistService | null = null;

  @InjectRepository(ArtistEntity)
  private artists: Repository<ArtistEntity>;

  // @Inject(TrackService)
  // private trackService: TrackService | null = null;

  // @Inject(AlbumService)
  // private albumService: AlbumService | null = null;

  constructor() {
    if (ArtistService.instance) {
      return ArtistService.instance;
    }

    ArtistService.instance = this;
  }

  async add(data: ArtistDto) {
    const artistDto = new ArtistEntity({
      name: data.name,
      grammy: data.grammy,
    });

    const artist = await this.artists.save(artistDto);

    return artist;
  }

  async get(id: string) {
    const artist = await this.artists.findOneBy({ id });

    if (!artist) {
      throw new Error(`Artist with id ${id} not found`);
    }

    return artist;
  }

  async getAll() {
    const artists = await this.artists.find();

    return artists;
  }

  async delete(id: string) {
    // await this.get(id);

    // const tracks = await this.trackService.getAll();
    // const filteredTracks = tracks.filter((track) => track.artistId === id);

    // for (const track of filteredTracks) {
    //   await this.trackService.update(track.id, { artistId: null });
    // }

    // const albums = await this.albumService.getAll();
    // const filteredAlbums = albums.filter((album) => album.artistId === id);

    // for (const album of filteredAlbums) {
    //   await this.albumService.update(album.id, { artistId: null });
    // }

    // this.artists = this.artists.filter((user) => user.id !== id);

    await this.artists.delete({ id });
  }

  async update(id: string, data: ArtistDto) {
    const artistDto = new ArtistEntity({
      id,
      name: data.name,
      grammy: data.grammy,
    });

    const artist = await this.artists.save(artistDto);

    return artist;
  }
}
