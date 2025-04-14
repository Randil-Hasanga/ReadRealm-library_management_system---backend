import { ApiProperty } from "@nestjs/swagger";

export class AuthPayload {
    @ApiProperty({ example: 'rnd@gmail.com', description: 'email of the user' })
    email : string;

    @ApiProperty({ example: '1234567', description: 'Password of the user' })
    password : string;
}