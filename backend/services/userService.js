const {User} = require('../models/index');

const userService = {
    createUser: async (data) => {
        const { email } = data;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            console.error('Email is already exist');
        }

        const newUser = await User.create(data);
        return newUser;
    },
    getUsers: async () => {
        const users = await User.findAll();
        return users;
    },
    getUserById: async (id) => {
        const user = await User.findOne({ where: { user_id: id } });
        if (!user) {
            console.error('User not found');
        }
        return user;
    },
    deleteAndRestoreUser: async (id, isActive) => {
        const user = await User.findOne({ where: { user_id: id } });
        if (!user) {
            console.error('User not found');
        }

        const [effectedRows] = await User.update({ isActive: isActive }, { where: { user_id: id } });

        if (effectedRows === 0) {
            console.error('Failed to update user');
        }

        return await User.findOne({ where: { user_id: id } });
    },
    updateUserById: async (id, updatedFields) => {
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
};

module.exports = userService;