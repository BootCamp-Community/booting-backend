import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('API For Bootcamp')
    .setDescription('BootCamp API Description')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Swagger EndPoint
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(4000);
}
bootstrap();
