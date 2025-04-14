import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true
  });
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('LibMS API')
    .setDescription('API for Library Management System personal project')
    .setVersion('1.0')
    .addTag('Authentication')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: (a: string, b: string) => {
        if (a === 'Authentication') return -1;
        if (b === 'Authentication') return 1;
        return a.localeCompare(b);
      },
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
