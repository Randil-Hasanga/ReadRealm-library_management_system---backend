import { ApiProperty } from '@nestjs/swagger';
import { BorrowedBookDTO } from './borrowedbooks.dto';

export class CreatedBorrowedBookDto {
  @ApiProperty({ example: 6 })
  bb_id: number;

  @ApiProperty({ example: 1 })
  borrower_id: number;

  @ApiProperty({ example: 1 })
  book_id: number;

  @ApiProperty({ example: false })
  isReturned: boolean;

  @ApiProperty({ example: "2025-04-18T00:00:00.000Z" })
  borrowed_date: string;

  @ApiProperty({ example: "2025-05-02T00:00:00.000Z" })
  return_date: string;

  @ApiProperty({ example: "2025-04-18T10:51:19.083Z" })
  updatedAt: string;

  @ApiProperty({ example: "2025-04-18T10:51:19.083Z" })
  createdAt: string;
}


export class CreateBorrowedBookResponseDto {
  @ApiProperty({ example: 'Borrowed Book inserted successfully' })
  message: string;

  @ApiProperty({type: CreatedBorrowedBookDto})
  data: CreatedBorrowedBookDto;
}

