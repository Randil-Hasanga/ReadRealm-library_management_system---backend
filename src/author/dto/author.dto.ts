import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AuthorDto{

    @ApiPropertyOptional({example: 1})
    @IsOptional()
    @IsNumber()
    author_id : number;

    @ApiProperty({example: "Martin Wickramasinghe"})
    @IsString()
    @IsNotEmpty()
    author_name : string;
}