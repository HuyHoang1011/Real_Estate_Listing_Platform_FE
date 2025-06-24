import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getFavoritesByUser(userId: number) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: { property: true },
    });
  }

  async addFavorite(userId: number, propertyId: number) {
    // Kiểm tra xem đã favorite chưa (theo userId và propertyId)
    const exists = await this.prisma.favorite.findFirst({
      where: {
        userId,
        propertyId,
      },
    });

    if (exists) {
      throw new ForbiddenException('Property already in favorites');
    }

    return this.prisma.favorite.create({
      data: {
        userId,
        propertyId,
      },
    });
  }

  async removeFavorite(userId: number, propertyId: number) {
    const favorite = await this.prisma.favorite.findFirst({
      where: {
        userId,
        propertyId,
      },
    });

    if (!favorite) {
      throw new ForbiddenException('Favorite not found');
    }

    return this.prisma.favorite.delete({
      where: { id: favorite.id },
    });
  }
}
