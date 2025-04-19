import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class BorrowerDTO {

    @ApiProperty({example: 'Wishwa'})
    @IsString()
    fname: string;

    @ApiProperty({example: 'Prabodhani'})
    @IsString()
    lname: string;

    @ApiProperty({example: 'Matara'})
    @IsString()
    address: string;

    @ApiProperty({example: '3445634'})
    @IsString()
    NIC: string;

    @ApiProperty({example: 'wish@gmail.com'})
    @IsEmail()
    email: string;

    @ApiProperty({example: '3768394'})
    @IsString()
    contact_no: string;

    @ApiProperty({example: true})
    @IsOptional()
    @IsBoolean()
    isActive: boolean = true;
}