import { Inject, Injectable } from '@nestjs/common';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { FavoriteEntity } from './model/favorite.entity';

@Injectable()
export class FavoriteService {
  private static instance: FavoriteService | null = null;
  private favorites: FavoriteEntity = {
    id: '050a70a9-7197-430b-b517-780a25b2aed9',
    // albums: ['050a70a9-7197-430b-b517-780a25b2aed8'],
    // artists: ['9e8d780f-b835-4932-baf7-4475a66bcc42'],
    // tracks: ['a7812f71-b070-4bdc-b7a7-e4dda7785b27'],
    albums: [],
    artists: [],
    tracks: [],
  };

  @Inject(TrackService)
  private trackService: TrackService | null = null;

  @Inject(AlbumService)
  private albumService: AlbumService | null = null;

  @Inject(ArtistService)
  private artistService: ArtistService | null = null;

  constructor() {
    if (FavoriteService.instance) {
      return FavoriteService.instance;
    }

    FavoriteService.instance = this;
  }

  async addAlbum(id: string) {
    const album = await this.albumService.get(id);

    if (this.favorites.albums.includes(album.id)) return;

    this.favorites.albums.push(album.id);
  }

  async addTrack(id: string) {
    const track = await this.trackService.get(id);

    if (this.favorites.tracks.includes(track.id)) return;

    this.favorites.tracks.push(track.id);
  }

  async addArtist(id: string) {
    const artist = await this.artistService.get(id);

    if (this.favorites.artists.includes(artist.id)) return;

    this.favorites.artists.push(artist.id);
  }

  async deleteAlbum(id: string) {
    const album = await this.albumService.get(id);

    this.favorites.albums = this.favorites.albums.filter(
      (id) => id !== album.id,
    );
  }

  async deleteTrack(id: string) {
    const track = await this.trackService.get(id);

    this.favorites.tracks = this.favorites.tracks.filter(
      (id) => id !== track.id,
    );
  }

  async deleteArtist(id: string) {
    const artist = await this.artistService.get(id);

    this.favorites.artists = this.favorites.artists.filter(
      (id) => id !== artist.id,
    );
  }

  async get() {
    const tracks = await Promise.allSettled(
      this.favorites.tracks.map((id) => this.trackService.get(id)),
    );

    const albums = await Promise.allSettled(
      this.favorites.albums.map((id) => this.albumService.get(id)),
    );

    const artists = await Promise.allSettled(
      this.favorites.artists.map((id) => this.artistService.get(id)),
    );

    return {
      tracks: tracks
        .map((track) => (track.status === 'fulfilled' ? track.value : null))
        .filter(Boolean),
      albums: albums
        .map((album) => (album.status === 'fulfilled' ? album.value : null))
        .filter(Boolean),
      artists: artists
        .map((artist) => (artist.status === 'fulfilled' ? artist.value : null))
        .filter(Boolean),
    };
  }
}
