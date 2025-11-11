import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Increase body-parser limits to support larger payloads (e.g., base64 images)
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ limit: '10mb', extended: true }));

  // 🔥 Config Swagger
  const config = new DocumentBuilder()
    .setTitle('API - Meu App Firebase')
    .setDescription('Documentação da API com Swagger')
    .setVersion('1.0')
    .addTag('users') // opcional, define um grupo
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // URL: http://localhost:3000/api

  await app.listen(3000);
  console.log('🔥 Swagger disponível em: http://localhost:3000/api');
}
bootstrap();
