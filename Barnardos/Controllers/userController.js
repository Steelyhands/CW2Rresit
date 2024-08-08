const nedb = require('gray-nedb');
const userDB = new nedb({ filename: './db/user.db', autoload: true });

class User {
    constructor(name, email, address, phoneNumber, isAdmin){
        this.name = name;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.isAdmin = isAdmin;
    }

    // Create a new user
    create() {
        const entry = {
            name: this.name,
            email: this.email,
            address: this.address,
            phoneNumber: this.phoneNumber,
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
    static updateUser(userId, updatedData) {
        return new Promise((resolve, reject) => {
            userDB.update({_id: userId}, { $set: updatedData }, {}, function(err, numReplaced) {
                if (err) reject(err);
                else resolve(numReplaced);
            });
        });
    }

    // Remove a user
    static removeUser(userId) {
        return new Promise((resolve, reject) => {
            userDB.remove({_id: userId}, {}, function(err, numRemoved) {
                if (err) reject(err);
                else resolve(numRemoved);
            });
        });
    }

    // Get all users
    static getAllUsers() {
        return new Promise((resolve, reject) => {
            userDB.find({}, function(err, users) {
                if (err) reject(err);
                else resolve(users);
            });
        });
    }

    // Get a user by ID
    static getUserById(userId) {
        return new Promise((resolve, reject) => {
            userDB.findOne({_id: userId}, function(err, user) {
                if (err) reject(err);
                else resolve(user);
            });
        });
    }
}

module.exports = User;
