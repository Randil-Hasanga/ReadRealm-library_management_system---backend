import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { BookService } from './book/book.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),UserModule, BookModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, BookService],
})
export class AppModule {}
