import { ApiProperty } from '@nestjs/swagger';

export class FineDto {
    @ApiProperty({ example: 1 })
    fine_id: number;

    @ApiProperty({ example: 2 })
    book_id: number;

    @ApiProperty({ example: '760', description: 'Fine amount in currency format' })
    fine_amount: string;

    @ApiProperty({ example: 'Heidy' })
    Book_Name: string;

    @ApiProperty({ example: 1 })
    borrower_id: number;

    @ApiProperty({ example: 'Hasanga HasangaR' })
    BorrowerFullName: string;

    @ApiProperty({ example: 'Matara' })
    BorrowerAddress: string;

    @ApiProperty({ example: 'randil@gmail.com' })
    BorrowerEmail: string;

    @ApiProperty({ example: '38237282' })
    BorrowerContact: string;

    @ApiProperty({ example: 1 })
    BorrowedBookID: number;

    @ApiProperty({ example: '2025-01-29T00:00:00.000Z', type: String })
    BorrowedDate: string;

    @ApiProperty({ example: '2025-03-12T00:00:00.000Z', type: String })
    DueDate: string;
}

export class FinePaidInfoDto {
    @ApiProperty({ example: 1 })
    fine_id: number;

    @ApiProperty({ example: 1, description: 'Borrowed Book ID' })
    bb_id: number;

    @ApiProperty({ example: 2, description: 'Book ID associated with the fine' })
    book_id: number;

    @ApiProperty({ example: 1, description: 'Borrower ID' })
    borrower_id: number;

    @ApiProperty({ example: '760', description: 'Fine amount as a string' })
    fine_amount: string;

    @ApiProperty({ example: true, description: 'Payment status of the fine' })
    isPaid: boolean;
}


export class GetFinesResponseDto {
    @ApiProperty({ example: 'Fines retrieved successfully' })
    message: string;

    @ApiProperty({ type: [FineDto] })
    data: FineDto[];
}

export class FineNotFoundDto {
    @ApiProperty({ example: 'Fine not found' })
    message: string;
}

export class FinePaidResponseDto {
    @ApiProperty({ example: 'Fine paid successfully' })
    message: string;

    @ApiProperty({ type: FinePaidInfoDto })
    fineInfo: FinePaidInfoDto;
}

export class FineErrorResponseDto {
    @ApiProperty({ example: 'Fine already paid or does not exist', description: 'Error message when the fine ID does not exist or already paid' })
    message: string;
}
