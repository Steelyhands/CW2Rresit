const UserDAO = require('../models/UserDAO'); // Update the path as needed
const bcrypt = require('bcrypt');
const saltRounds = 10; // Define saltRounds

exports.show_user_account = function(req, res) {
  res.render('user/userAccount', {
    user: 'user',
    post: 'post'
  });
}

exports.show_user_update = function(req, res) {
  res.render('user/updateUser', {
    user: 'user'
  });
}

exports.update_user = function (req, res) {
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
};

exports.delete_user = function(req, res) {
  const userId = req.body.userId;

  UserDAO.removeUser(userId, (err) => {
      if (err) {
          console.error("Error deleting user:", err);
          res.status(500).send("Internal server error");
          return;
      }
      res.redirect("/user/users");
  });
};

exports.delete_account = function(req, res) {
  const userId = req.cookie.id;

  UserDAO.removeUser(userId, (err) => {
      if (err) {
          console.error("Error deleting user:", err);
          res.status(500).send("Internal server error");
          return;
      }
      res.clearCookie("jwt").status(200).redirect("/");
  });
};

exports.show_users = function (req, res) {
  UserDAO.getAllUsers()
    .then((list) => {
      res.render("user/users", {
        users: list,
      });
    })
    .catch((err) => {
      console.log("unable to fetch users", err);
    });
};
