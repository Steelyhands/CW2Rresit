const nedb = require('gray-nedb');
const userDB = new nedb({ filename: './db/user.db', autoload: true });

//creating and initialising UsaerDAO object
class UserDAO {
    constructor(fullName, email, address, phoneNumber, isAdmin, userName){
        this.userName = userName;
        this.fullName = fullName;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.userId = userId;
        this.isAdmin = isAdmin;
    }

    // Create a new user
    createUser() {
        const entry = {
            userName: this.userName,
            fullName: this.fullName,
            email: this.email,
            address: this.address,
            phoneNumber: this.phoneNumber,
            userId: this.userId,
            isAdmin: this.isAdmin,
        };
        return new Promise((resolve, reject) => {
            userDB.insert(entry, function(err, newUser) {
                if (err) reject(err);
                else resolve(newUser);
            });
        });
    }

    // Update an existing user
    updateUser(userId, updatedData) {
        return new Promise((resolve, reject) => {
            userDB.update({_id: userId}, { $set: updatedData }, {}, function(err, numReplaced) {
                if (err) reject(err);
                else resolve(numReplaced);
            });
        });
    }

    // Remove a user
    removeUser(userId) {
        return new Promise((resolve, reject) => {
            userDB.remove({_id: userId}, {}, function(err, numRemoved) {
                if (err) reject(err);
                else resolve(numRemoved);
            });
        });
    }

    // Get all users
    getAllUsers() {
        return new Promise((resolve, reject) => {
            userDB.find({}, function(err, users) {
                if (err) reject(err);
                else resolve(users);
            });
        });
    }

    // Get a user by ID
    getUserById(userId) {
        return new Promise((resolve, reject) => {
            userDB.findOne({_id: userId}, function(err, user) {
                if (err) reject(err);
                else resolve(user);
            });
        });
    }
}

module.exports = UserDAO;
