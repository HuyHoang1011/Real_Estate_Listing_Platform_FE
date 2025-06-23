import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  // Tạo yêu cầu liên hệ
  async createContact(data: { userId: number; propertyId: number; message: string }) {
    return this.prisma.contact.create({ data });
  }

  // Admin xem tất cả yêu cầu liên hệ
  async findAll() {
    return this.prisma.contact.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        property: true,
      },
    });
  }

  // User xem các yêu cầu của mình
  async findByUser(userId: number) {
    return this.prisma.contact.findMany({
      where: { userId },
      include: { property: true },
    });
  }

  // Admin cập nhật trạng thái (ví dụ: trả lời, xử lý)
  async updateStatus(id: number, status: string) {
    return this.prisma.contact.update({ where: { id }, data: { status } });
  }

  // Xóa yêu cầu (admin)
  async remove(id: number) {
    return this.prisma.contact.delete({ where: { id } });
  }
}
