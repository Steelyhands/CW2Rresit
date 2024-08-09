const UserDAO = require('../models/UserModel'); // Update the path as needed
const bcrypt = require('bcrypt');
const saltRounds = 10; // Define saltRounds

class User {
  constructor(name, email, address, phoneNumber, isAdmin, username, password){
      this.name = name;
      this.email = email;
      this.address = address;
      this.phoneNumber = phoneNumber;
      this.isAdmin = isAdmin;
      this.username = username;
      this.password = password;
  }

  update_user(req, res) {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    const isAdmin = req.body.isAdmin;
    const userName = req.body.userName;
    const password = req.body.password;

    if (!fullName || !email || !address || !phoneNumber || !isAdmin || !userName || !password) {
      res.send(401, "Please provide all user details");
      return;
    }

    bcrypt.hash(password, saltRounds).then(function(hash){
        const updatedUser = {
            fullName: fullName,
            email: email,
            address: address,
            phoneNumber: phoneNumber,
            isAdmin: isAdmin,
            userName: userName,
            password: hash,
        };
        UserDAO.updateUser(userName, updatedUser)
            .then(() => res.json({ message: 'User updated successfully' }))
            .catch(err => res.status(500).json({ error: err.message }));
    });
  }

  show_user_account(req, res) {
    res.render('user/userAccount', {
      user: 'user',
      post: 'post'
    });
  }

  show_user_update(req, res) {
    res.render('user/updateUser', {
      user: 'user'
    });
  }

}

module.exports = User;
