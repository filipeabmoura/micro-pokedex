import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
<<<<<<< HEAD
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
=======
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin:'http://localhost:4200',
    credentials: true,
  })

>>>>>>> feature/backend-auth
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
