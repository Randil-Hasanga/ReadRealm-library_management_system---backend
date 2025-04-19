import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDto {
    @ApiProperty({ example: 1 })
    user_id: number;

    @ApiProperty({ example: 'Vinod' })
    fname: string;

    @ApiProperty({ example: 'Hasanga' })
    lname: string;

    @ApiProperty({ example: 'Waralla' })
    address: string;

    @ApiProperty({ example: '58367' })
    NIC: string;

    @ApiProperty({ example: 'hasanga@gmail.com' })
    email: string;

    @ApiProperty({ example: '0987654' })
    contact_no: string;

    @ApiProperty({ example: 'Helper' })
    position: string;

    @ApiProperty({ example: true })
    isActive: boolean;

    @ApiProperty({ example: '2025-03-29T09:00:01.000Z' })
    createdAt: string;

    @ApiProperty({ example: '2025-03-29T09:00:01.000Z' })
    updatedAt: string;
}

export class UserCreatedDto {
    @ApiProperty({
        example: 10,
        description: 'Unique identifier of the user',
    })
    user_id: number;

    @ApiProperty({
        example: 'randilhasanga23343@gmail.com',
        description: 'Email of the newly created user',
    })
    email: string;

    @ApiProperty({
        example: 'Randil',
        description: 'First name of the newly created user',
    })
    fname: string;

    @ApiProperty({
        example: 'Hasanga',
        description: 'Last name of the newly created user',
    })
    lname: string;

    @ApiProperty({
        example: 'Waralla',
        description: 'Address of the newly created user',
    })
    address: string;

    @ApiProperty({
        example: '4648364',
        description: 'National Identity Card (NIC) of the newly created user',
    })
    NIC: string;

    @ApiProperty({
        example: '0987654',
        description: 'Contact number of the newly created user',
    })
    contact_no: string;

    @ApiProperty({
        example: 'Helper',
        description: 'Position of the newly created user',
    })
    position: string;

    @ApiProperty({
        example: true,
        description: 'Indicates if the user is active',
    })
    isActive: boolean;

    @ApiProperty({
        example: '2025-04-19T11:56:26.775Z',
        description: 'Timestamp of when the user was last updated',
    })
    updatedAt: string;

    @ApiProperty({
        example: '2025-04-19T11:56:26.775Z',
        description: 'Timestamp of when the user was created',
    })
    createdAt: string;
}


export class EmailExistsErrorDto {
    @ApiProperty({ example: 403, description: 'HTTP status code indicating forbidden action' })
    statusCode: number;

    @ApiProperty({ example: 'Email already exists', description: 'Description of the error' })
    message: string;
}

export class BadRequestErrorDto {
    @ApiProperty({
        example: 400,
        description: 'HTTP status code indicating a bad request',
    })
    statusCode: number;

    @ApiProperty({
        example: 'Bad Request',
        description: 'The general error message',
    })
    error: string;

    @ApiProperty({
        example: [
            'email must be an email',
            'password must be longer than or equal to 6 characters',
            'password must be a string',
        ],
        description: 'An array of validation error messages',
    })
    message: string[];
}

export class UsersResponseDto {
    @ApiProperty({ example: 'Users fetched successfully' })
    message: string;

    @ApiProperty({ type: [UserInfoDto] })
    data: UserInfoDto[];
}

export class UpdateUsersResponseDto {
    @ApiProperty({ example: 'User updated successfully' })
    message: string;

    @ApiProperty({ type: [UserInfoDto] })
    data: UserInfoDto[];
}

export class UserNotFoundDto {
    @ApiProperty({
        example: 'Error fetching user',
        description: 'Describes the operation that failed',
    })
    message: string;

    @ApiProperty({
        example: 'User not found',
        description: 'Details about the specific error',
    })
    error: string;
}

export class IsActiveDto {
    @ApiProperty({
        example: true,
        description: 'Indicates whether the user is active',
    })
    isActive: boolean;
}