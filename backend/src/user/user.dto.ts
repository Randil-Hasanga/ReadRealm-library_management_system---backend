import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class UserDto{
    
    @IsOptional()
    @IsNumber()
    user_id: number;

    @IsString()
    @IsNotEmpty()
    fname: string;

    @IsString()
    @IsNotEmpty()
    lname: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    NIC: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    contact_no: string;

    @IsString()
    @IsNotEmpty()
    position: string;

    @IsBoolean()
    isActive: boolean;
}