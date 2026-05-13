import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // hapus field yang tidak ada di DTO
      forbidNonWhitelisted: true, // error kalau ada field asing
      transform: true, // ubah tipe otomatis (string → number)
    }),
  );
  await app.listen(process.env.PORT || 3000);
}


bootstrap();
