const User = require('../models/User');

const userService = {
    async createUser(data) {
        // add {} id error
        const {email} = data;

        const existingUser = await User.findOne({where: {email}});

        if(existingUser){
            throw new Error('Email is already exist');
        }

        const newUser = await User.create(data);
        return newUser;
    },
    async getUsers() {
        const users = await User.findAll();
        return users;
    },
    async getUserById(id){
        const user = await User.findOne({where: {user_id: id}});
        if(!user){
            throw new Error('User not found');
        }
        return user;
    }
};

module.exports = userService;