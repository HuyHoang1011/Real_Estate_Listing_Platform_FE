import {
  Controller,
  Post,
  Delete,
  Get,
  UseGuards,
  Request,
  Param,
  ParseIntPipe,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  addFavorite(@Request() req, @Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoriteService.addFavorite(req.user.userId, createFavoriteDto.propertyId);
  }

  @Delete(':propertyId')
  removeFavorite(@Request() req, @Param('propertyId', ParseIntPipe) propertyId: number) {
    return this.favoriteService.removeFavorite(req.user.userId, propertyId);
  }

  @Get()
  findMyFavorites(@Request() req) {
    return this.favoriteService.findByUser(req.user.userId);
  }
}
