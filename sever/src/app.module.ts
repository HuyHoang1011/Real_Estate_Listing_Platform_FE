import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PropertyModule } from './property/property.module';
import { ContactModule } from './contact/contact.module';
import { FavoriteModule } from './favorite/favorite.module';


@Module({
  imports: [PrismaModule, UserModule, AuthModule, PropertyModule, ContactModule, FavoriteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
