import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    return this.prisma.user.findMany({
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
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: CreateUserDto) {
    console.log('Creating user with email:', data.email);
    
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    try {
      const newUser = await this.prisma.user.create({ 
        data: {
          ...data,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          avatar: true,
          role: true,
        },
      });
      
      console.log('User created successfully:', newUser.id);
      return newUser;
    } catch (error) {
      console.error('=== ERROR DETAILS ===');
      console.error('Error type:', typeof error);
      console.error('Error constructor:', error.constructor.name);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      console.error('Full error object:', JSON.stringify(error, null, 2));
      console.error('=====================');
      
      // Handle Prisma unique constraint violation
      if (error.code === 'P2002') {
        console.log('Throwing ConflictException for duplicate email');
        throw new ConflictException('Email đã được sử dụng');
      }
      
      // Handle other Prisma errors
      if (error.code && error.code.startsWith('P')) {
        console.log('Prisma error detected, throwing ConflictException');
        throw new ConflictException('Email đã được sử dụng');
      }
      
      // Handle any other error
      console.log('Unknown error, throwing generic error');
      throw new Error(`Database error: ${error.message}`);
    }
  }

  async update(id: number, data: UpdateUserDto) {
    try {
      // If email is being updated, check if it already exists
      if (data.email) {
        const existingUser = await this.findByEmail(data.email);
        if (existingUser && existingUser.id !== id) {
          throw new ConflictException('Email đã được sử dụng');
        }
      }
      
      // If password is provided, hash it
      let updateData = { ...data };
      if (data.password) {
        updateData.password = await bcrypt.hash(data.password, 10);
      }
      
      return this.prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          avatar: true,
          role: true,
        },
      });
    } catch (error) {
      console.error('Error updating user:', error);
      
      // Handle Prisma unique constraint violation
      if (error.code === 'P2002') {
        throw new ConflictException('Email đã được sử dụng');
      }
      
      // Handle our custom conflict exception
      if (error instanceof ConflictException) {
        throw error;
      }
      
      throw new Error(`Không thể cập nhật người dùng: ${error.message}`);
    }
  }

  async delete(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      if (!user) throw new NotFoundException('User not found');
      
      // The database will automatically handle cascade deletion of related records
      return this.prisma.user.delete({
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
    } catch (error) {
      console.error('Error deleting user:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }
}
