import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AuthorDto{
    @IsOptional()
    @IsNumber()
    author_id : number;

    @IsString()
    @IsNotEmpty()
    author_name : string;
}