const Datastore = require('nedb');
let db = new Datastore({ filename: './Barnardos/db/user.db', autoload: true });
const bcrypt = require('bcrypt');
const saltRounds = 10;
class User {
    constructor(name, email, ukAddress, phoneNumber, isAdmin) {
        this.name = name;
        this.email = email;
        this.ukAddress = ukAddress;
        this.phoneNumber = phoneNumber;
        this.userId = userId;
        this.isAdmin = isAdmin; // This should only be set by an admin
    }

    // Method to register a new user

    register(username, name, email, phoneNumber, address, password) {
        // Hash the password
        bcrypt.hash(password, saltRounds).then(function(hash) {
            // Create a new user object with the hashed password
            let user = {
                username: username,
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                address: address,
                password: hash, // Store the hashed password
                role: 'user'
            };
    
            // Insert the new user into the user database
            db.insert(user, function(err) {
                if (err) {
                    console.log("failed to add new user:",newUser);
                }
                else{
                console.log(newUser);
                // generating unique ID
                user.userId = newUser._id;
                //console.log("new user ID is:",newUser._id)); work out where to add this
                }
            });
            // Return user 
            return user;
        });
    
    }
    //setting admin status for users, should only be accessable by users with isAdmin
    setAdminStatus(isAdmin) {
        if (currentUser.isAdmin) { // Assuming currentUser is the one who is currently logged in
            this.isAdmin = isAdmin;
        } else {
            throw new Error('you do not have authorrisation to perform this action.');
        }
    }
}