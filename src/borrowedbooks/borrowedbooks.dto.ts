import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class BorrwedBookDTO{

    @IsNumber()
    borrower_id: number;

    @IsNumber()
    book_id: number;

    @IsBoolean()
    isReturned: boolean = false;

}