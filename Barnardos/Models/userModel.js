const nedb = require('gray-nedb');
const nedb = require('gray-nedb');
const userDB = new nedb({ filename: './db/user.db', autoload: true });
const bcrypt = require('bcrypt');
const saltRounds = 10; // Define saltRounds

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
            userDB.insert(entry, function(err, newUser) {
                if (err){ 
                    reject(err);
                }
                else{ 
                    resolve(newUser);
                }
            });
    }

    // Update an existing user
    updateUser(userId, updatedData) {
            userDB.update({_id: userId}, { $set: updatedData }, {}, function(err, numReplaced) {
                if (err){
                    console.log('Error updating user: ', err);
                }
                else{
                    console.log('User updated successfully');
                }
            });
    }

    // Remove a user
    removeUser(userId) {
            userDB.remove({_id: userId}, {}, function(err, removeUser) {
                if (err){ 
                    reject(err);
                }
                else{ 
                    console.log("user" + userId + "removed from system")
                    resolve(removeUser);
                }
            });
    }

    // Get all users
    getAllUsers() {
        return new Promise((resolve, reject) => {
            userDB.find({}, function(err, users) {
                if (err){
                    reject(err);
                }
                else{
                    console.log("all users: ", users);
                }
            });
        });
    }

    // Get a user by ID
    getUserById(userId, cb) {
        userDB.find({_id: userId}, function(err, user) {
            if (err){ 
                console.log('User not found');
                return cb(err);
            }
            else {
                if (user.length == 0){
                    console.log("please provide a valid ID");
                    return cb(null, null);
                }
                console.log("user:" + user)
                return cb(null, user[0]);
            }
        });
}

}

module.exports = UserDAO;
