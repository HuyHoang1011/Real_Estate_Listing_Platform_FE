import {
    Controller,
    Post,
    Body,
    UseGuards,
    Request,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        // Trả về thông tin user đã tạo (không có password)
        return this.authService.register(createUserDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(
        @Body() body: { email: string; password: string },
    ) {
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            return {
                statusCode: HttpStatus.UNAUTHORIZED,
                message: 'Invalid credentials',
            };
        }
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@Request() req) {
        // Logout cơ bản: client xóa token, backend không lưu session
        // Nếu bạn có blacklist token thì xử lý ở đây
        return { message: `User ${req.user.email} logged out successfully` };
    }

    @HttpCode(HttpStatus.OK)
    @Post('refresh-token')
    async refreshToken(@Body('refresh_token') refreshToken: string) {
        return this.authService.refreshToken(refreshToken);
    }
}
