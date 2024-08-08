const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

//Show user details
router.get('/:id', userController.showUser);

//Create new user form
router.get('/createUser', userController.createUserForm);

//Create new user
router.post('/', userController.createUser);

//Form for editing an user
router.get('/:id/edit', userController.updateUserForm);

//Update user
router.put('/:id', userController.updateUser);

//Delete user
router.delete('/:id', userController.deleteUser);

module.exports = router;