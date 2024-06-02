import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FavoriteAlbumEntity,
  FavoriteArtistEntity,
  FavoriteTrackEntity,
  FavoritesResponse,
} from './model/favorite.entity';

const DEFAULT_USER_ID = 'c728225e-50b3-45aa-8a30-feebeb73ff98';
@Injectable()
export class FavoriteService {
  private static instance: FavoriteService | null = null;

  @InjectRepository(FavoriteAlbumEntity)
  private albums: Repository<FavoriteAlbumEntity>;

  constructor() {
    if (FavoriteService.instance) {
      return FavoriteService.instance;
    }

    FavoriteService.instance = this;
  }

  async addAlbum(id: string) {
    const favoriteDto = new FavoriteAlbumEntity({
      userId: DEFAULT_USER_ID,
      albumId: id,
    });

    await this.albums
      .createQueryBuilder('insert_album_query')
      .insert()
      .into(FavoriteAlbumEntity)
      .values(favoriteDto)
      .orIgnore()
      .execute();
  }

  async addTrack(id: string) {
    const favoriteDto = new FavoriteTrackEntity({
      userId: DEFAULT_USER_ID,
      trackId: id,
    });

    await this.albums
      .createQueryBuilder('insert_track_query')
      .insert()
      .into(FavoriteTrackEntity)
      .values(favoriteDto)
      .orIgnore()
      .execute();
  }

  async addArtist(id: string) {
    const favoriteDto = new FavoriteArtistEntity({
      userId: DEFAULT_USER_ID,
      artistId: id,
    });

    await this.albums
      .createQueryBuilder('insert_album_query')
      .insert()
      .into(FavoriteArtistEntity)
      .values(favoriteDto)
      .orIgnore()
      .execute();
  }

  async deleteAlbum(id: string) {
    await this.albums
      .createQueryBuilder('delete_album_query')
      .delete()
      .from(FavoriteTrackEntity)
      .where('albumId = :albumId AND userId = :userId', {
        albumId: id,
        userId: DEFAULT_USER_ID,
      })
      .execute();
  }

  async deleteTrack(id: string) {
    await this.albums
      .createQueryBuilder('delete_track_query')
      .delete()
      .from(FavoriteTrackEntity)
      .where('trackId = :trackId AND userId = :userId', {
        trackId: id,
        userId: DEFAULT_USER_ID,
      })
      .execute();
  }

  async deleteArtist(id: string) {
    await this.albums
      .createQueryBuilder('delete_artist_query')
      .delete()
      .from(FavoriteArtistEntity)
      .where('artistId = :artistId AND userId = :userId', {
        artistId: id,
        userId: DEFAULT_USER_ID,
      })
      .execute();
  }

  async get() {
    const favs: FavoritesResponse = await this.albums.query(
      `
      WITH fav_tracks AS (
        SELECT user_id, jsonb_agg(track_id) as tracks
        FROM favorite_track
        WHERE user_id = $1
        GROUP BY user_id
      ), fav_albums AS (
        SELECT user_id, jsonb_agg(album_id) as albums
        FROM favorite_album
        WHERE user_id = $1
        GROUP BY user_id
      ), fav_artists AS (
        SELECT user_id, jsonb_agg(artist_id) as artists
        FROM favorite_artist
        WHERE user_id = $1
        GROUP BY user_id
      )
      SELECT
      COALESCE(tracks, '[]') as tracks,
      COALESCE(albums, '[]') as albums,
      COALESCE(artists, '[]') as artists
      FROM fav_tracks
      LEFT JOIN fav_albums ON fav_tracks.user_id = fav_albums.user_id
      LEFT JOIN fav_artists ON fav_tracks.user_id = fav_artists.user_id
      `,
      [DEFAULT_USER_ID],
    );

    return favs.at(0);
  }
}
