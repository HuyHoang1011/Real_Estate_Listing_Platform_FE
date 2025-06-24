import { Controller, Get, Put, Request, UseGuards, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@Request() req) {
        console.log('Payload JWT (req.user):', req.user);
        return this.userService.findById(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('me')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(req.user.userId, updateUserDto);
    }
}
