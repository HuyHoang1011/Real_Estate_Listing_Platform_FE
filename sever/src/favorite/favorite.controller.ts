import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Request,
  Body,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FavoritesService } from './favorite.service';
import { AddFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getFavorites(@Request() req) {
    return this.favoritesService.getFavoritesByUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  addFavorite(@Request() req, @Body() addFavoriteDto: AddFavoriteDto) {
    return this.favoritesService.addFavorite(req.user.userId, addFavoriteDto.propertyId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':propertyId')
  removeFavorite(
    @Request() req,
    @Param('propertyId', ParseIntPipe) propertyId: number,
  ) {
    return this.favoritesService.removeFavorite(req.user.userId, propertyId);
  }
}
