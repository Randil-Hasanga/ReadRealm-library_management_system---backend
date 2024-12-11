const UserService = require('../services/userService');

const userController = {
    async createUser(req, res){
        try {
            const {fname, lname, address, NIC, email, password, contact_no, position} = req.body;
            const newUser = await UserService.createUser({fname, lname, address, NIC, email, password, contact_no, position});
            res.status(201).json({message: 'User created successfully', data: newUser});
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error: error.message });
        }
    },
    async getUsers(req, res){
        try {
            const users = await UserService.getUsers();
            res.status(200).json({ message: 'Users fetched successfully', data: users });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error: error.message });
        }
    },
    async getUserById(req, res){
        const user_id = req.params.id;
        try {
            const user = await UserService.getUserById(user_id);
            res.status(200).json({ message: 'Users fetched successfully', data: user });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error: error.message });
        }
    }
}

module.exports = userController;