import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Jwt } from 'src/shared/decorators/Jwt';
import { UserJwt } from '../../shared/model/types/auth.type';

@Controller('favs')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  async get(@Jwt() user: UserJwt) {
    const favorites = await this.favoriteService.get({ userId: user.sub });

    return favorites;
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Jwt() user: UserJwt,
  ) {
    try {
      await this.favoriteService.addTrack({ userId: user.sub, trackId: id });

      return { message: `Track with id ${id} added to favorites` };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Jwt() user: UserJwt,
  ) {
    try {
      await this.favoriteService.deleteTrack({ userId: user.sub, trackId: id });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Jwt() user: UserJwt,
  ) {
    try {
      await this.favoriteService.addAlbum({ userId: user.sub, albumId: id });

      return { message: `Album with id ${id} added to favorites` };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Jwt() user: UserJwt,
  ) {
    try {
      await this.favoriteService.deleteAlbum({ userId: user.sub, albumId: id });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Jwt() user: UserJwt,
  ) {
    try {
      await this.favoriteService.addArtist({ userId: user.sub, artistId: id });

      return { message: `Artist with id ${id} added to favorites` };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Jwt() user: UserJwt,
  ) {
    try {
      await this.favoriteService.deleteArtist({
        userId: user.sub,
        artistId: id,
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
}
