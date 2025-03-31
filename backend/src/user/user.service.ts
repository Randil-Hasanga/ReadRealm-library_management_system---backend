import { Injectable } from '@nestjs/common';
import User from 'src/models/User';
import * as bcrypt from 'bcrypt';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {

    async getUsers() {
        const users = await User.findAll({attributes: {exclude:['password']}});
        return users;
    }

    async createUser(data: UserDto) {
        const { email, password, ...otherData } = data;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            email,
            password: hashedPassword, 
            ...otherData
        });
        return newUser;
    }

    async getUserById(id: number) {
        const user = await User.findOne({ where: { user_id: id }, attributes: {exclude:['password']}});
        if (!user) {
            console.error('User not found');
        }
        return user;
    }

    async deleteAndRestoreUser(id: number, isActive: boolean) {
        const user = await User.findOne({ where: { user_id: id } });
        if (!user) {
            console.error('User not found');
        }
        const [effectedRows] = await User.update({ isActive: isActive }, { where: { user_id: id } });
        if (effectedRows === 0) {
            console.error('Failed to update user');
        }
        return await User.findOne({ where: { user_id: id } });
    }

    async updateUserById(id: number, updatedFields: any) {
        const user = await User.findOne({ where: { user_id: id } });
        if (!user) {
            console.error('User not found');
        }
        const [effectedRows] = await User.update(updatedFields, { where: { user_id: id } });

        if (effectedRows === 0) {
            console.error('Failed to update user');
        }

        return await User.findOne({ where: { user_id: id } });
    }
}
