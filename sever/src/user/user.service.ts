import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

interface CreateUserWithRole extends CreateUserDto {
  role: string;
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  // Định nghĩa tham số kiểu mở rộng có role
  async create(data: CreateUserWithRole) {
    return this.prisma.user.create({ data });
  }

  async update(id: number, data: UpdateUserDto) {
    await this.findById(id); // Kiểm tra tồn tại user

    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
      },
    });
  }

  async remove(id: number) {
    await this.findById(id); // Kiểm tra tồn tại user

    return this.prisma.user.delete({ where: { id } });
  }
}
