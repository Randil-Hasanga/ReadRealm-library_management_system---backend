import { ApiProperty } from '@nestjs/swagger';

export class OverdueBookInfoDto {
    @ApiProperty({ example: 1 })
    BorrowedBookID: number;

    @ApiProperty({ example: 1 })
    borrower_id: number;

    @ApiProperty({ example: "Rand Hasanga" })
    BorrowerFullName: string;

    @ApiProperty({ example: "randil@gmail.com" })
    email: string;

    @ApiProperty({ example: "38237282" })
    contact_no: string;

    @ApiProperty({ example: 2 })
    book_id: number;

    @ApiProperty({ example: "Heidy" })
    BookName: string;

    @ApiProperty({ example: "2025-01-29T00:00:00.000Z" })
    borrowed_date: string;

    @ApiProperty({ example: "2025-03-12T00:00:00.000Z" })
    return_date: string;

    @ApiProperty({ example: 0 })
    isReturned: number;
}

export class OverdueBooksResponseDto {
    @ApiProperty({ example: 'Over due books' })
    message: string;

    @ApiProperty({ type: [OverdueBookInfoDto] })
    data: OverdueBookInfoDto[];
}