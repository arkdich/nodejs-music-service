import { Injectable } from '@nestjs/common';
import { TrackEntity } from './model/track.entity';
import { TrackDto } from './model/track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  private static instance: TrackService | null = null;

  @InjectRepository(TrackEntity)
  private tracks: Repository<TrackEntity>;

  constructor() {
    if (TrackService.instance) {
      return TrackService.instance;
    }

    TrackService.instance = this;
  }

  async add(data: TrackDto) {
    const trackDto = new TrackEntity({
      name: data.name,
      albumId: data.albumId,
      artistId: data.artistId,
      duration: data.duration,
    });

    const track = await this.tracks.save(trackDto);

    return track;
  }

  async get(id: string) {
    const track = await this.tracks.findOneBy({ id });

    if (!track) {
      throw new Error(`Track with id ${id} not found`);
    }

    return track;
  }

  async getAll() {
    const tracks = await this.tracks.find();

    return tracks;
  }

  async delete(id: string) {
    await this.tracks.delete({ id });
  }

  async update(id: string, data: Partial<TrackDto>) {
    const trackDto = new TrackEntity({
      id,
      name: data.name,
      albumId: data.albumId,
      artistId: data.artistId,
      duration: data.duration,
    });

    const track = await this.tracks.save(trackDto);

    return track;
  }
}
