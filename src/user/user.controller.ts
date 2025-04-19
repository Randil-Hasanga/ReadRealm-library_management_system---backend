import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto, UserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { BadRequestErrorDto, EmailExistsErrorDto, IsActiveDto, UpdateUsersResponseDto, UserCreatedDto, UserNotFoundDto, UsersResponseDto } from './dto/userResponse.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiOperation({summary: 'Get all users'})
    @ApiCreatedResponse({type: UsersResponseDto})
    @UseGuards(JwtAuthGuard)
    async getUsers(@Res() res) {
        try {
            const users = await this.userService.getUsers();
            res.status(200).json({ message: 'Users fetched successfully', data: users });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error: error.message });
        }
    }

    @Post()
    @ApiOperation({summary: 'Create new user'})
    @ApiCreatedResponse({type: UserCreatedDto})
    @ApiForbiddenResponse({type: EmailExistsErrorDto})
    @ApiBadRequestResponse({type: BadRequestErrorDto})
    @ApiBody({type: UserDto})
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async createUser(@Body() userData: UserDto) {
        return {
            message: 'User Created Successfully',
            data: await this.userService.createUser(userData)
        }
    }

    @Get(':id')
    @ApiParam({name: 'id', example: 1})
    @ApiOperation({summary: 'Get user by id'})
    @ApiCreatedResponse({type: UsersResponseDto})
    @UseGuards(JwtAuthGuard)
    async getUserById (@Param('id') user_id, @Res() res) {
        
        try {
            const user = await this.userService.getUserById(user_id);
            res.status(200).json({ message: 'User fetched successfully', data: user });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error: error.message });
        }
    }

    @Delete(':id/delete-or-restore')
    @ApiParam({name: 'id', example: 1})
    @ApiOperation({summary: 'Delete user by id'})
    @ApiCreatedResponse({type: UpdateUsersResponseDto})
    @ApiBody({type: IsActiveDto})
    @ApiNotFoundResponse({type: UserNotFoundDto})
    @UseGuards(JwtAuthGuard)
    async deleteOrRestoreUserById (@Param('id') user_id, @Body() userData : UserDto, @Res() res) {
        const isActive = userData.isActive;
        try {
            const updatedUser = await this.userService.deleteAndRestoreUser(user_id, isActive);
            res.status(200).json({ message: 'User updated successfully', data: updatedUser });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error: error.message });
        }
    }

    @Patch(':id/update')
    @ApiParam({name: 'id', example: 1})
    @ApiOperation({summary: 'Update user by id'})
    @ApiCreatedResponse({type: UpdateUsersResponseDto})
    @ApiNotFoundResponse({type: UserNotFoundDto})
    @ApiBody({type: UpdateUserDto})
    @UseGuards(JwtAuthGuard)
    async updateUserById(@Param('id') userId, @Body() updatedUserData: UserDto, @Res() res){
        try {
            const updatedUser = await this.userService.updateUserById(userId, updatedUserData);
            res.status(200).json({ message: 'User updated successfully', data: updatedUser });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error: error.message });
        }
    }
}
