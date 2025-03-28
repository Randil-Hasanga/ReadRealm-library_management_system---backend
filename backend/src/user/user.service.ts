import { Injectable } from '@nestjs/common';
import User from 'src/models/User';

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
