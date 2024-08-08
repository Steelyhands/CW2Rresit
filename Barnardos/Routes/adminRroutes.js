const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/createAdmin', userController.createAdminForm);
router.post('/createAdmin', userController.createAdmin);
router.get('/allUsers', userController.viewAllUsers);
router.delete('/allUsers/:id', userController.deleteUser);

module.exports = router;