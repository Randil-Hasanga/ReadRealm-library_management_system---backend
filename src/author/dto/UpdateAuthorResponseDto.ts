import { ApiProperty } from '@nestjs/swagger';
import { AuthorDto } from './author.dto';

export class UpdateAuthorResponseDto {
  @ApiProperty({ example: 'Author updated successfully' })
  message: string;

  @ApiProperty({ type: AuthorDto })
  data: AuthorDto;
}