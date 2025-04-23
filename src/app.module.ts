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
import { FineModule } from './fine/fine.module';
import { FineService } from './fine/fine.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { SummeryModule } from './summery/summery.module';
import { SummeryService } from './summery/summery.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),UserModule, BookModule, AuthorModule, BorrowedbooksModule, BorrowerModule, FineModule, AuthModule, SummeryModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, BookService, AuthorService, BorrowedbooksService, FineService, AuthService,SummeryService, JwtService],
})
export class AppModule {}
