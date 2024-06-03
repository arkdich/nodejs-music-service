import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FavoriteAlbumEntity,
  FavoriteArtistEntity,
  FavoriteTrackEntity,
  FavoritesResponse,
} from './model/favorite.entity';

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

  async addAlbum({ userId, albumId }: { userId: string; albumId: string }) {
    const favoriteDto = new FavoriteAlbumEntity({
      userId,
      albumId,
    });

    await this.albums
      .createQueryBuilder('insert_album_query')
      .insert()
      .into(FavoriteAlbumEntity)
      .values(favoriteDto)
      .orIgnore()
      .execute();
  }

  async addTrack({ userId, trackId }: { userId: string; trackId: string }) {
    const favoriteDto = new FavoriteTrackEntity({
      userId,
      trackId,
    });

    await this.albums
      .createQueryBuilder('insert_track_query')
      .insert()
      .into(FavoriteTrackEntity)
      .values(favoriteDto)
      .orIgnore()
      .execute();
  }

  async addArtist({ userId, artistId }: { userId: string; artistId: string }) {
    const favoriteDto = new FavoriteArtistEntity({
      userId,
      artistId,
    });

    await this.albums
      .createQueryBuilder('insert_album_query')
      .insert()
      .into(FavoriteArtistEntity)
      .values(favoriteDto)
      .orIgnore()
      .execute();
  }

  async deleteAlbum({ userId, albumId }: { userId: string; albumId: string }) {
    await this.albums
      .createQueryBuilder('delete_album_query')
      .delete()
      .from(FavoriteAlbumEntity)
      .where('albumId = :albumId AND userId = :userId', {
        albumId,
        userId,
      })
      .execute();
  }

  async deleteTrack({ userId, trackId }: { userId: string; trackId: string }) {
    await this.albums
      .createQueryBuilder('delete_track_query')
      .delete()
      .from(FavoriteTrackEntity)
      .where('trackId = :trackId AND userId = :userId', {
        trackId,
        userId,
      })
      .execute();
  }

  async deleteArtist({
    userId,
    artistId,
  }: {
    userId: string;
    artistId: string;
  }) {
    await this.albums
      .createQueryBuilder('delete_artist_query')
      .delete()
      .from(FavoriteArtistEntity)
      .where('artistId = :artistId AND userId = :userId', {
        artistId,
        userId,
      })
      .execute();
  }

  async get({ userId }: { userId: string }) {
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
      [userId],
    );

    return favs.at(0);
  }
}
