import { ApiProperty } from '@nestjs/swagger';
import { AuthorDto } from './author.dto';

export class RetrieveAuthorResponseDto {
  @ApiProperty({ example: 'Author retrived successfully' })
  message: string;

  @ApiProperty({ type: AuthorDto })
  data: AuthorDto;
}