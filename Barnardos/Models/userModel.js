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
    register() {
        
        
    }

   
    setAdminStatus(isAdmin) {
        if (currentUser.isAdmin) { // Assuming currentUser is the one who is currently logged in
            this.isAdmin = isAdmin;
        } else {
            throw new Error('Only admins can update admin status.');
        }
    }
}