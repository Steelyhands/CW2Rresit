const UserDAO = require('../Models/userModel'); 
const userDAO = new userDAO 

class UserController {
    // Create a new user
    static createUser(fullName, email, address, phoneNumber, isAdmin, userName, password) {
        const user = new UserDAO(fullName, email, address, phoneNumber, isAdmin, userName, password);
        return user.createUser();
    }

    // Update an existing user
    static updateUser(userId, updatedData) {
        return UserDAO.updateUser(userId, updatedData);
    }

    // Remove a user
    static removeUser(userId) {
        return UserDAO.removeUser(userId);
    }

    // Get all users
    static getAllUsers() {
        return UserDAO.getAllUsers();
    }

    // Get a user by ID
    static getUserById(userId, cb) {
        return UserDAO.getUserById(userId, cb);
    }
}

module.exports = UserController;
