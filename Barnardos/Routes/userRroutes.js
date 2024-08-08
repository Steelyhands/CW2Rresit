const express = require('express');
const router = express.Router();
const userController = require('..Barnardos/controllers/userController.js'); // Assuming userController is in '../controllers/userController.js'

// Route to create a user
router.post('/create', userController.create);

// Route to delete a user
router.delete('/delete/:id', userController.delete);

// Route to make a user an admin
router.put('/makeAdmin/:id', userController.makeAdmin);

module.exports = router;
