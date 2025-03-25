import { Injectable } from '@nestjs/common';
import User from 'src/models/User';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
    
    async getUsers() {
        const users = await User.findAll();
        return users;
    }

    async createUser(data: any) {
        const { email } = data;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            console.error('Email is already exist');
        }
        const newUser = await User.create(data);
        return newUser;
    }

    async getUserById(id: number) {
        const user = await User.findOne({ where: { user_id: id } });
        if (!user) {
            console.error('User not found');
        }
        return user;
    }
}
