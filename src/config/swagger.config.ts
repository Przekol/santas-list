import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const swaggerConfig = new DocumentBuilder()
  .setTitle("API with Santa's List")
  .setDescription("API developed throughout the API with Santa's List")
  .setVersion('1.0')
  .build();
const getSwaggerDocument = (
  app: INestApplication,
  swaggerConfig: Omit<OpenAPIObject, 'paths'>,
): OpenAPIObject => SwaggerModule.createDocument(app, swaggerConfig);

export const startSwagger = (path: string, app: INestApplication): void => {
  const document = getSwaggerDocument(app, swaggerConfig);
  SwaggerModule.setup(path, app, document);
};
