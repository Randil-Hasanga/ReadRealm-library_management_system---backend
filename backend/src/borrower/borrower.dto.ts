import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class BorrowerDTO {

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
    contact_no: string;

    @IsOptional()
    @IsBoolean()
    isActive: boolean = true;
}