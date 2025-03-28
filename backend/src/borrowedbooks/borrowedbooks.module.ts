import { Module } from '@nestjs/common';
import { BorrowedbooksController } from './borrowedbooks.controller';
import { BorrowedbooksService } from './borrowedbooks.service';

@Module({
  controllers: [BorrowedbooksController],
  providers: [BorrowedbooksService]
})
export class BorrowedbooksModule {}
