import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user,
    };
  }

  async register(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const createUserData = {
      ...data,
      password: hashedPassword,
      role: 'user',
    };
    const user = await this.usersService.create(createUserData);
    const { password, ...result } = user;
    return result;
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findById(payload.sub);
      if (!user) throw new UnauthorizedException('User not found');

      const newPayload = { email: user.email, sub: user.id, role: user.role };
      return {
        access_token: this.jwtService.sign(newPayload, { expiresIn: '15m' }),
      };
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
