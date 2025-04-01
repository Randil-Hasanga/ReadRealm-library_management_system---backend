import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthPayload } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() authPayload: AuthPayload) {
        const user = await this.authService.validateUser(authPayload);
        if(!user){
            throw new HttpException("Authentication failed: User not found", HttpStatus.UNAUTHORIZED);
        }
        if(user == 'invalid'){
            throw new HttpException("Authentication failed: Incorrect password", HttpStatus.UNAUTHORIZED);
        }
        return user;
        // res.status(HttpStatus.OK).json({
        //     message: response.message,
        //     user : response.user
        // });
    }
}
