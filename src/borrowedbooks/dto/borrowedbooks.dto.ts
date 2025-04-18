import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class BorrowedBookDTO{

    @ApiProperty({example: 2})
    @IsNumber()
    borrower_id: number;

    @ApiProperty({example: 2})
    @IsNumber()
    book_id: number;

    @ApiProperty({example: false})
    @IsBoolean()
    isReturned: boolean = false;

}