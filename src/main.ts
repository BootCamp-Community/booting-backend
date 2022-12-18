import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as expressBasicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 접근 시 아이디/패스워드 설정
  app.use(
    ['/api-docs'],
    expressBasicAuth({
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
      challenge: true,
    }),
  );

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

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
