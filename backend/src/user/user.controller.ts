import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getUsers(@Res() res) {
        try {
            const users = await this.userService.getUsers();
            res.status(200).json({ message: 'Users fetched successfully', data: users });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error: error.message });
        }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async createUser(@Body() userData: UserDto) {
        return {
            message: 'User Created Successfully',
            data: await this.userService.createUser(userData)
        }
    }
}
