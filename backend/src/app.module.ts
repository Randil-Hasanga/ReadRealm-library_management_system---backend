import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { BookService } from './book/book.service';
import { AuthorModule } from './author/author.module';
import { AuthorService } from './author/author.service';
import { BorrowedbooksModule } from './borrowedbooks/borrowedbooks.module';
import { BorrowedbooksService } from './borrowedbooks/borrowedbooks.service';
import { BorrowerModule } from './borrower/borrower.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),UserModule, BookModule, AuthorModule, BorrowedbooksModule, BorrowerModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, BookService, AuthorService, BorrowedbooksService],
})
export class AppModule {}
