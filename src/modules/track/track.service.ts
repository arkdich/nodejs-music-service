import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { TrackEntity } from './model/track.entity';
import { TrackDto } from './model/track.dto';

@Injectable()
export class TrackService {
  private static instance: TrackService | null = null;
  private tracks: TrackEntity[] = [];

  constructor() {
    if (TrackService.instance) {
      return TrackService.instance;
    }

    TrackService.instance = this;
  }

  async add(data: TrackDto) {
    const id = uuid();

    const track = new TrackEntity({
      id,
      name: data.name,
      albumId: data.albumId,
      artistId: data.artistId,
      duration: data.duration,
    });

    this.tracks.push(track);

    return track;
  }

  async get(id: string) {
    const track = this.tracks.find((track) => track.id === id);

    if (!track) {
      throw new Error(`Track with id ${id} not found`);
    }

    return track;
  }

  async getAll() {
    return this.tracks;
  }

  async delete(id: string) {
    await this.get(id);

    this.tracks = this.tracks.filter((user) => user.id !== id);
  }

  async update(id: string, data: Partial<TrackDto>) {
    const track = await this.get(id);

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        track[key] = value;
      }
    });

    return track;
  }
}
