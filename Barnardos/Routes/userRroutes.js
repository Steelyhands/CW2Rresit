const express = require('express');
const router = express.Router();
const userController = require('../Barnardos/controllers/userController'); // Update the path as needed

// Route to show user account
router.get('/userAccount', userController.show_user_account);

// Route to show user update form
router.get('/updateUser', userController.show_user_update);

// Route to update a user
router.post('/updateUser', userController.update_user);

// Route to delete a user
router.delete('/deleteUser', userController.delete_user);

// Route to delete account
router.delete('/deleteAccount', userController.delete_account);

// Route to show all users
router.get('/users', userController.show_users);

module.exports = router;
