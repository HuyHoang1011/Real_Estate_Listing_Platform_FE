// src/property/property.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';  // giả sử bạn có PrismaService đã cấu hình
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PropertyService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(filters: any = {}) {
    const where: any = {};

    if (filters.keyword) {
      where.OR = [
        { title: { contains: filters.keyword, mode: 'insensitive' } },
        { description: { contains: filters.keyword, mode: 'insensitive' } },
        { province: { contains: filters.keyword, mode: 'insensitive' } },
        { district: { contains: filters.keyword, mode: 'insensitive' } },
        { ward: { contains: filters.keyword, mode: 'insensitive' } },
        { streetAddress: { contains: filters.keyword, mode: 'insensitive' } },
      ];
    }
    if (filters.minPrice) {
      where.price = { gte: filters.minPrice };
    }
    if (filters.maxPrice) {
      where.price = { ...where.price, lte: filters.maxPrice };
    }
    if (filters.minArea) {
      where.area = { gte: filters.minArea };
    }
    if (filters.maxArea) {
      where.area = { ...where.area, lte: filters.maxArea };
    }
    if (filters.bedrooms) {
      where.bedrooms = filters.bedrooms;
    }
    if (filters.propertyType) {
      where.type = filters.propertyType;
    }

    const orderBy: Prisma.PropertyOrderByWithRelationInput | undefined =
      filters.sort === 'newest' ? { id: 'desc' } : undefined;
    const take = filters.limit ?? 10;

    return this.prisma.property.findMany({
      where,
      orderBy,
      take,
    });
  }

  async findOne(id: number) {
    return this.prisma.property.findUnique({ where: { id } });
  }

  async create(data: CreatePropertyDto) {
    return this.prisma.property.create({ data });
  }

  async update(id: number, data: UpdatePropertyDto) {
    return this.prisma.property.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.property.delete({ where: { id } });
  }
}
