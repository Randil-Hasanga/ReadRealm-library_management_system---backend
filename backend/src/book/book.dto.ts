import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class BookDto {

    @IsOptional()
    @IsNumber()
    book_id: number;

    @IsString()
    @IsNotEmpty()
    book_name: string;

    @IsString()
    @IsNotEmpty()
    ISBN: string;

    @IsNumber()
    @IsNotEmpty()
    author_id: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    available_qty: number;

    @IsBoolean()
    isActive: boolean = true;
}