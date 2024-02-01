import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //whiteList: true will protect app from input/send variable tha is not defined on the DTO 
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  await app.listen(3210);
}
bootstrap();
