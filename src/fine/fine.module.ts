import { Module } from '@nestjs/common';
import { FineController } from './fine.controller';
import { FineService } from './fine.service';

@Module({
  controllers: [FineController],
  providers: [FineService]
})
export class FineModule {}
