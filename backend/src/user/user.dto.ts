import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class UserDto{
    
    @IsOptional()
    @IsNumber()
    user_id: number;

    @IsString()
    fname: string;

    @IsString()
    lname: string;

    @IsString()
    address: string;

    @IsString()
    NIC: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    contact_no: string;

    @IsString()
    position: string;

    @IsBoolean()
    isActive: boolean = true;
}