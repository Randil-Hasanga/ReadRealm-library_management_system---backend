import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthPayload } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService : AuthService) {}

    @Post('login')
    async login(@Body() authPayload: AuthPayload, @Res() res){
        const response = await this.authService.validateUser(authPayload);

        res.status(HttpStatus.OK).json({
            message: response.message,
            user : response.user
        });
    }
}
