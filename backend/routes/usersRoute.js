const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();


router
    .get('/', userController.getUsers)
    .get('/:id', userController.getUserById)
    .post('/', userController.createUser)
    .delete('/:id/delete-or-restore', userController.deleteOrRestoreUserById)
    .patch('/:id/update', userController.updateUserById);


module.exports = router;
