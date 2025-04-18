import { ApiProperty } from '@nestjs/swagger';

export class BorrowedBookInfoDto {
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

export class BorrowedBooksResponseDto {
    @ApiProperty({ example: 'Borrowed books' })
    message: string;

    @ApiProperty({ type: [BorrowedBookInfoDto] })
    data: BorrowedBookInfoDto[];
}

export class SingleBorrowedBooksResponseDto {
    @ApiProperty({ example: 'Borrowed books by id' })
    message: string;

    @ApiProperty({ type: BorrowedBookInfoDto })
    data: BorrowedBookInfoDto;
}

export class BorrowedBooksByBookIdResponseDto {
    @ApiProperty({ example: 'Borrowed books by book id' })
    message: string;

    @ApiProperty({ type: [BorrowedBookInfoDto] })
    data: BorrowedBookInfoDto[];
}

export class BorrowedBooksByBorrowerIdResponseDto {
    @ApiProperty({ example: 'Borrowed books by book id' })
    message: string;

    @ApiProperty({ type: [BorrowedBookInfoDto] })
    data: BorrowedBookInfoDto[];
}