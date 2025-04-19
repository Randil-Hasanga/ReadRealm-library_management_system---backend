import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class UserDto{
    
    @IsOptional()
    @IsNumber()
    user_id: number;

    @ApiProperty({example: 'John'})
    @IsString()
    fname: string;

    @ApiProperty({example: 'Doe'})
    @IsString()
    lname: string;

    @ApiProperty({example: 'Matara'})
    @IsString()
    address: string;

    @ApiProperty({example: '43435465'})
    @IsString()
    NIC: string;

    @ApiProperty({example: 'john4564@gmail.com'})
    @IsEmail()
    email: string;

    @ApiProperty({example: '1234567'})
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({example: '0913456765'})
    @IsString()
    contact_no: string;

    @ApiProperty({example: 'Helper'})
    @IsString()
    position: string;

    @ApiProperty({example: true})
    @IsBoolean()
    isActive: boolean = true;
}

export class UpdateUserDto{

    @ApiProperty({example: 'John'})
    @IsString()
    fname: string;

    @ApiProperty({example: 'Doe'})
    @IsString()
    lname: string;

    @ApiProperty({example: 'Matara'})
    @IsString()
    address: string;

    @ApiProperty({example: '43435465'})
    @IsString()
    NIC: string;

    @ApiProperty({example: 'john4564@gmail.com'})
    @IsEmail()
    email: string;

    @ApiProperty({example: '1234567'})
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({example: '0913456765'})
    @IsString()
    contact_no: string;

    @ApiProperty({example: 'Helper'})
    @IsString()
    position: string;

}