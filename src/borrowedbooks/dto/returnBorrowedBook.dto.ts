import { ApiProperty } from '@nestjs/swagger';

export class ReturnedBorrowedBookDto {
    @ApiProperty({ example: 8 })
    bb_id: number;

    @ApiProperty({ example: 1 })
    borrower_id: number;

    @ApiProperty({ example: 1 })
    book_id: number;

    @ApiProperty({ example: "2025-04-18T00:00:00.000Z" })
    borrowed_date: string;

    @ApiProperty({ example: "2025-05-02T00:00:00.000Z" })
    return_date: string;

    @ApiProperty({ example: "2025-04-18T00:00:00.000Z" })
    returned_date: string;

    @ApiProperty({ example: true })
    isReturned: boolean;

    @ApiProperty({ example: "2025-04-18T10:55:13.000Z" })
    createdAt: string;

    @ApiProperty({ example: "2025-04-18T11:19:43.000Z" })
    updatedAt: string;
}

export class ReturnBorrowedBookResponseDto {
    @ApiProperty({ example: 'Borrowed book returned' })
    message: string;

    @ApiProperty({ type: ReturnedBorrowedBookDto })
    data: ReturnedBorrowedBookDto;
}