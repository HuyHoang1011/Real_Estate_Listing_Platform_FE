import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',  // hoặc '*', nhưng nên dùng origin cụ thể để an toàn
    credentials: true,  // nếu cần gửi cookie hoặc xác thực
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
