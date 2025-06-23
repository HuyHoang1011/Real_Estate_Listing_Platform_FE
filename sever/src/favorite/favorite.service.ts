import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  // Thêm bất động sản vào yêu thích
  async addFavorite(userId: number, propertyId: number) {
    // Kiểm tra đã tồn tại chưa
    const existing = await this.prisma.favorite.findFirst({
      where: { userId, propertyId },
    });
    if (existing) {
      return existing;
    }
    return this.prisma.favorite.create({
      data: { userId, propertyId },
    });
  }

  // Xóa khỏi yêu thích
  async removeFavorite(userId: number, propertyId: number) {
    return this.prisma.favorite.deleteMany({
      where: { userId, propertyId },
    });
  }

  // Lấy danh sách yêu thích của user
  async findByUser(userId: number) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: { property: true },
    });
  }
}
