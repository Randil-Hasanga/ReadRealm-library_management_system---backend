import { ApiProperty } from '@nestjs/swagger';
import { BookDto } from './book.dto';

export class RetrieveBookResponseDto {
  @ApiProperty({ example: 'Books retrieved successfully' })
  message: string;

  @ApiProperty({ type: BookDto })
  data: BookDto;
}