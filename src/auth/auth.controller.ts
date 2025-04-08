import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthPayload } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from './guards/local.guard';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @UseGuards(LocalGuard) //IMP: when use  @UseGuards(AuthGuard('local')) same thing happens, but when use @UseGuards(LocalGuard) with LocalGuard class, can add additional logic
    login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const token = req.user;
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24,
        })

        return { message: 'Logged in Successfully' };
    }

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
