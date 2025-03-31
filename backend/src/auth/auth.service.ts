import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthPayload } from './dto/auth.dto';
import User from 'src/models/User';
import * as bcrypt from 'bcrypt';
import { error } from 'console';

@Injectable()
export class AuthService {
    async validateUser({ email, password }: AuthPayload) {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            throw new HttpException("Authentication failed: User not found", HttpStatus.UNAUTHORIZED);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new HttpException("Authentication failed: Incorrect password", HttpStatus.UNAUTHORIZED);
        }

        return {
            message: "Authenticated",
            user: { id: user.user_id, email: user.email } // Exclude password from response
        };
    }
}
