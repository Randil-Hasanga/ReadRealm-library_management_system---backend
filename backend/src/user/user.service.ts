import { Injectable } from '@nestjs/common';
import User from 'src/models/User';

@Injectable()
export class UserService {
    async getUsers()  {
        const users = await User.findAll();
        return users;
    }
    async createUser(data) {
        const { email } = data;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            console.error('Email is already exist');
        }

        const newUser = await User.create(data);
        return newUser;
    }
}
