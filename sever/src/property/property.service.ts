import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePropertyDto) {
    return this.prisma.property.create({ data });
  }

  async findAll() {
    return this.prisma.property.findMany();
  }

  async findOne(id: number) {
    const property = await this.prisma.property.findUnique({ where: { id } });
    if (!property) {
      throw new NotFoundException(`Property with id ${id} not found`);
    }
    return property;
  }

  async update(id: number, data: UpdatePropertyDto) {
    // Kiểm tra property có tồn tại
    await this.findOne(id);

    return this.prisma.property.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    // Kiểm tra property có tồn tại
    await this.findOne(id);

    return this.prisma.property.delete({
      where: { id },
    });
  }
}
