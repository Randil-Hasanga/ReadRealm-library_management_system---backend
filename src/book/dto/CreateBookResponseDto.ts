import { ApiProperty } from '@nestjs/swagger';
import { BookDto } from '../dto/book.dto';

export class CreateBookResponseDto {
  @ApiProperty({ example: 'Book inserted successfully' })
  message: string;

  @ApiProperty({ type: BookDto })
  data: BookDto;
}