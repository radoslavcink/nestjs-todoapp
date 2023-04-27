import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './model/config/config.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //transformOptions: { excludeExtraneousValues: true },
      //transform: true,
    }),
  );
  const appConfigService = app.get(ConfigService);
  await app.listen(appConfigService.config.appPort);
}
bootstrap();
