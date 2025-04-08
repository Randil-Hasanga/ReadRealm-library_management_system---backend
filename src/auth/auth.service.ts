import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthPayload } from './dto/auth.dto';
import User from 'src/models/User';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService) { }

    async validateUser({ email, password }: AuthPayload) {
        const user = await User.findOne({ where: { email: email } });
        if (!user) return null;
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (isPasswordValid) {
            const userWithoutPassword = user.get({ plain: true }) as Record<string, any>;
            delete userWithoutPassword.password;
            return this.jwtService.sign(userWithoutPassword);
        }
    }
}
