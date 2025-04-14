import { ApiProperty } from '@nestjs/swagger';
import { AuthorDto } from './author.dto';

export class CreateAuthorResponseDto {
  @ApiProperty({ example: 'Author created successfully' })
  message: string;

  @ApiProperty({ type: AuthorDto })
  data: AuthorDto;
}