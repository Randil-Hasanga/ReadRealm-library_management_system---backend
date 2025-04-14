import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthPayload } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from './guards/local.guard';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @ApiOperation({ summary: 'Used for login to system' })
    @ApiCreatedResponse({ description: "Logged in Successfully" })
    @ApiBody({ type: AuthPayload })
    @Post('login')
    @UseGuards(LocalGuard) //IMP: when use  @UseGuards(AuthGuard('local')) same thing happens, but when use @UseGuards(LocalGuard) with LocalGuard class, can add additional logic
    login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const token = req.user;
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24,
        })

        return { message: 'Logged in Successfully' };
    }

    @ApiOperation({ summary: 'Logout user by clearing auth_token cookie' })
    @ApiResponse({ status: 200, description: 'Logged out successfully' })
    @Post('logout')
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('auth_token');
        return { message: 'Logged out successfully' };
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request) {
        console.log(req.user)
        return req.user;
    }

}
