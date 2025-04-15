import { ApiProperty } from '@nestjs/swagger';
import { BookDto } from './book.dto';

export class UpdateBookResponseDto {
  @ApiProperty({ example: 'Book updated successfully' })
  message: string;

  @ApiProperty({ type: BookDto })
  data: BookDto;
}