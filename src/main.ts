import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from '@app/config'
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //env variables 
  const port = config.PORT

  // Swagger config
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Search API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, () => {
    Logger.log(`search [service] listening on port ${port}`);
  });
}

bootstrap();
