import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WebsocketService } from './websocket/services/websocket.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}

bootstrap();
