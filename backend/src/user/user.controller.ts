import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
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
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async createUser(@Body() userData: UserDto) {
        return {
            message: 'User Created Successfully',
            data: await this.userService.createUser(userData)
        }
    }

    @Get(':id')
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
