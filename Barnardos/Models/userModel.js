const nedb = require('gray-nedb');
const userDB = new nedb({ filename: './db/user.db', autoload: true });
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserDAO {
    constructor(db) {
        this.db = db;
    }

    create(userName, fullName, email, phoneNumber, address, password) {
        return bcrypt.hash(password, saltRounds).then(function(hash) {
            var newUser = {
                userName: userName,
                fullName: fullName,
                email: email,
                phoneNumber: phoneNumber,
                address: address,
                password: hash,
                role: 'user'
            };
    
            this.db.insert(newUser, function (err) 
            {
                if (err) // Catches any errors
                { 
                    console.log("Can't insert user:", userName);
                }
            });
        });
    }

    // Other methods for retrieving, updating, and deleting users would go here
}

const dao = new UserDAO(userDB);

module.exports = dao;
