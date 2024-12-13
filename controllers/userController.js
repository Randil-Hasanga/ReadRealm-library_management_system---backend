const UserService = require('../services/userService');

const userController = {
    createUser: async (req, res) => {
        try {
            const { fname, lname, address, NIC, email, password, contact_no, position, isActive } = req.body;
            const newUser = await UserService.createUser({ fname, lname, address, NIC, email, password, contact_no, position, isActive });
            res.status(201).json({ message: 'User created successfully', data: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error: error.message });
        }
    },
    getUsers: async (req, res) => {
        try {
            const users = await UserService.getUsers();
            res.status(200).json({ message: 'Users fetched successfully', data: users });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error: error.message });
        }
    },
    getUserById: async (req, res) => {
        const user_id = req.params.id;
        try {
            const user = await UserService.getUserById(user_id);
            res.status(200).json({ message: 'User fetched successfully', data: user });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error: error.message });
        }
    },
    deleteOrRestoreUserById: async (req, res) => {
        const user_id = req.params.id;
        const { isActive } = req.body;
        try {
            const updatedUser = await UserService.deleteAndRestoreUser(user_id, isActive);
            res.status(200).json({ message: 'User updated successfully', data: updatedUser });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error: error.message });
        }
    },
    updateUserById: async (req, res) => {
        const user_id = req.params.id;

        try {
            const updatedUser = await UserService.updateUserById(user_id, req.body);
            res.status(200).json({ message: 'User updated successfully', data: updatedUser });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error: error.message });
        }
    }
}

module.exports = userController;