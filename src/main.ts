import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://readrealm-frontend-3da2a969ac8f.herokuapp.com',
    credentials: true
  });
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('LibMS API')
    .setDescription('API Documentation for personal Library Management System project')
    .setVersion('1.0')
    .addTag('Library')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
