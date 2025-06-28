import { Controller, Get, Put, Post, Delete, Request, UseGuards, Body, UsePipes, ValidationPipe, Param, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get('test')
    testEndpoint() {
        console.log('Test endpoint called');
        return { message: 'Backend is working' };
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@Request() req) {
        return this.userService.findById(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('me')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(req.user.userId, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUsers() {
        return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async createUser(@Body() createUserDto: CreateUserDto) {
        try {
            console.log('Controller: Creating user with email:', createUserDto.email);
            const result = await this.userService.create(createUserDto);
            console.log('Controller: User created successfully');
            return result;
        } catch (error) {
            console.error('Controller caught error:', error);
            console.error('Controller error type:', typeof error);
            console.error('Controller error constructor:', error.constructor.name);
            console.error('Controller error status:', error.status);
            console.error('Controller error message:', error.message);
            
            // Re-throw the error to let NestJS handle it
            throw error;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id);
    }
}
