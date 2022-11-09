import { ValidationPipe } from '@nestjs/common';

export const VALIDATION_PIPE_CONFIG = new ValidationPipe({
  disableErrorMessages: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
});
