import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import User from 'src/models/User';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {

    async getUsers() {
        const users = await User.findAll({ attributes: { exclude: ['password'] } });
        return users;
    }

    // async createUser(data: UserDto) {
    //     const { email, password, ...otherData } = data;
    //     const existingUser = await User.findOne({ where: { email } });
    //     if (existingUser) {
    //         throw new HttpException('Email already exists', HttpStatus.FORBIDDEN);
    //     }
    //     const hashedPassword = await bcrypt.hash(password, 10);
    //     const newUser = await User.create({
    //         email,
    //         password: hashedPassword, 
    //         ...otherData
    //     });
    //     return newUser;
    // }

    async createUser(data: UserDto) {
        const { email, password, ...otherData } = data;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new HttpException('Email already exists', HttpStatus.FORBIDDEN);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            email,
            password: hashedPassword,
            ...otherData
        });

        // Return the new user without the password, using a different name to avoid redeclaration
        const { password: _, ...userWithoutPassword } = newUser.get();
        return userWithoutPassword;
    }

    async getUserById(id: number) {
        const user = await User.findOne({ where: { user_id: id }, attributes: { exclude: ['password'] } });
        if (!user) {
            console.error('User not found');
        }
        return user;
    }

    async deleteAndRestoreUser(id: number, isActive: boolean) {
        const user = await User.findOne({ where: { user_id: id } });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const [effectedRows] = await User.update({ isActive: isActive }, { where: { user_id: id } });
        if (effectedRows === 0) {
            throw new HttpException('Failed to update user', HttpStatus.SERVICE_UNAVAILABLE);
        }
        return await User.findOne({ where: { user_id: id }, attributes: {exclude: ['password']} });
    }

    async updateUserById(id: number, updatedFields: any) {
        const user = await User.findOne({ where: { user_id: id } });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        const [affectedRows] = await User.update(updatedFields, {
            where: { user_id: id },
        });

        if (affectedRows === 0) {
            throw new HttpException('Failed to update user', HttpStatus.SERVICE_UNAVAILABLE);
        }

        const updatedUser = await User.findOne({
            where: { user_id: id },
            attributes: { exclude: ['password'] }, // 👈 exclude password
        });

        return updatedUser;
    }
}
