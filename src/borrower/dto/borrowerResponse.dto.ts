import { ApiProperty } from '@nestjs/swagger';

export class BorrowerInfoDto {
    @ApiProperty({ example: 10 })
    borrower_id: number;

    @ApiProperty({ example: 'Wishwa' })
    fname: string;

    @ApiProperty({ example: 'Prabodhani' })
    lname: string;

    @ApiProperty({ example: 'Matara' })
    address: string;

    @ApiProperty({ example: '658364586' })
    NIC: string;

    @ApiProperty({ example: 'wishwa@gmail.com' })
    email: string;

    @ApiProperty({ example: '573985474' })
    contact_no: string;

    @ApiProperty({ example: true })
    isActive: boolean;

    @ApiProperty({ example: '2025-04-19T09:58:37.307Z' })
    updatedAt: string;

    @ApiProperty({ example: '2025-04-19T09:58:37.307Z' })
    createdAt: string;
}

export class BorrowerSummaryDto {
    @ApiProperty({ example: 1 })
    borrower_id: number;

    @ApiProperty({ example: 'Rand Hasanga' })
    BorrowerFullName: string;

    @ApiProperty({ example: 'Matara' })
    address: string;

    @ApiProperty({ example: '343452344' })
    NIC: string;

    @ApiProperty({ example: 'randil@gmail.com' })
    email: string;

    @ApiProperty({ example: '38237282' })
    contact_no: string;
}

export class CreateBorrowerResponseDto {
    @ApiProperty({ example: 'Borrower insertion successful' })
    message: string;

    @ApiProperty({ type: BorrowerInfoDto })
    data: BorrowerInfoDto;
}

export class GetAllBorrowersResponseDto {
    @ApiProperty({ example: 'Borrowers retrieved successfully' })
    message: string;

    @ApiProperty({ type: [BorrowerSummaryDto] })
    data: BorrowerSummaryDto[];
}

export class GetBorrwerByIdResponseDto {
    @ApiProperty({ example: 'Borrowers retrieved successfully' })
    message: string;

    @ApiProperty({ type: BorrowerInfoDto })
    data: BorrowerInfoDto;
}

export class UpdateBorrowerResponseDto {
    @ApiProperty({ example: 'Borrower updated successfully' })
    message: string;

    @ApiProperty({ example: 1, description: 'Number of rows affected by the update' })
    effectedRows: number;
}

export class DeleteBorrowerFailedResponseDto {
    @ApiProperty({ example: 'Cannot update borrower' })
    message: string;

    @ApiProperty({ example: 'Borrower has fines to pay' })
    Reason: string;
}

export class DeleteBorrowerSuccessResponseDto {
    @ApiProperty({ example: 'Borrower updated successfully' })
    message: string;

    @ApiProperty({ example: 1 })
    effectedRows: number;
}