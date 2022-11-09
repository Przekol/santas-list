import * as Joi from 'joi';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const dbConnection = (configService) => {
  return {
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: ['dist/**/**.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
  } as TypeOrmModuleAsyncOptions;
};

export const ENV_VALIDATION_OBJECT = Joi.object({
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  PORT: Joi.number(),
});
