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

    // Individual location filters
    if (filters.province) {
      where.province = { contains: filters.province, mode: 'insensitive' };
    }
    if (filters.district) {
      where.district = { contains: filters.district, mode: 'insensitive' };
    }
    if (filters.ward) {
      where.ward = { contains: filters.ward, mode: 'insensitive' };
    }

    // Price filters
    if (filters.minPrice || filters.maxPrice) {
      where.price = {};
      if (filters.minPrice) {
        where.price.gte = filters.minPrice;
      }
      if (filters.maxPrice) {
        where.price.lte = filters.maxPrice;
      }
    }

    // Area filters
    if (filters.minArea || filters.maxArea) {
      where.area = {};
      if (filters.minArea) {
        where.area.gte = filters.minArea;
      }
      if (filters.maxArea) {
        where.area.lte = filters.maxArea;
      }
    }

    // Bedrooms filter
    if (filters.bedrooms) {
      where.bedrooms = filters.bedrooms;
    }

    // Property type filter
    if (filters.propertyType) {
      where.type = filters.propertyType;
    }

    // Sorting
    let orderBy: Prisma.PropertyOrderByWithRelationInput | undefined;
    if (filters.sort === 'newest') {
      orderBy = { id: 'desc' };
    } else if (filters.sort === 'oldest') {
      orderBy = { id: 'asc' };
    } else if (filters.sort === 'price_asc') {
      orderBy = { price: 'asc' };
    } else if (filters.sort === 'price_desc') {
      orderBy = { price: 'desc' };
    } else if (filters.sort === 'area_asc') {
      orderBy = { area: 'asc' };
    } else if (filters.sort === 'area_desc') {
      orderBy = { area: 'desc' };
    }

    const take = filters.limit ?? 10;
    const page = filters.page ?? 1;
    const skip = (page - 1) * take;

    const [data, total] = await Promise.all([
      this.prisma.property.findMany({
        where,
        orderBy,
        take,
        skip,
      }),
      this.prisma.property.count({ where }),
    ]);

    return { data, total };
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
