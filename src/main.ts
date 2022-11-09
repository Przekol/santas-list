import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { startSwagger } from './config';
import { VALIDATION_PIPE_CONFIG } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  startSwagger('api', app);
  app.useGlobalPipes(VALIDATION_PIPE_CONFIG);
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(3000);
}
bootstrap();
