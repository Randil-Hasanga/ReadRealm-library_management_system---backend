import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class BookDto {

    @IsOptional()
    @IsNumber()
    book_id: number;

    @ApiProperty({example: "Madol duwa"})
    @IsString()
    @IsNotEmpty()
    book_name: string;

    @ApiProperty({example: "12345645"})
    @IsString()
    @IsNotEmpty()
    ISBN: string;

    @ApiProperty({example: 1})
    @IsNumber()
    @IsNotEmpty()
    author_id: number;

    @ApiProperty({example: 5})
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({example: 5})
    @IsNumber()
    @IsNotEmpty()
    available_qty: number;

    @IsBoolean()
    isActive: boolean = true;
}