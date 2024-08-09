const nedb = require('gray-nedb');
const userDB = new nedb({ filename: './db/user.db', autoload: true });
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserDAO {
    constructor(fullName, email, address, phoneNumber, isAdmin, userName) {
        this.fullName = fullName;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.isAdmin = isAdmin;
        this.userName = userName;
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
    
            userDB.insert(newUser, function (err) 
            {
                if (err) // Catches any errors
                { 
                    console.log("Can't insert user:", userName);
                }
                });
            });
    }

}
const dao = new UserDAO(userDB);

module.exports = dao;
