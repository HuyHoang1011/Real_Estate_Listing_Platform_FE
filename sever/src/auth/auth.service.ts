import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async refreshToken(token: string) {
    try {
      // Giải mã refresh token
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET, // Biến môi trường cho refresh token
      });

      // Lấy user theo payload
      const user = await this.usersService.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Tạo access token mới
      const newPayload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };
      const access_token = this.jwtService.sign(newPayload);

      return { access_token };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmailForAuth(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,           // Dùng sub thay vì id
      email: user.email,
      role: user.role,
      permissions: user.permissions,  // Nếu bạn có dùng
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  // Hàm đăng ký (register) cũng nên hash password và tạo user
  async register(data: { name: string; email: string; password: string; phone?: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.usersService.create({
      ...data,
      password: hashedPassword,
      role: 'user',
    });
    return user;
  }
}
