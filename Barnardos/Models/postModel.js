// Import the 'gray-nedb' package and create a new instance of nedb for posts
const nedb = require('gray-nedb');
const postDB = new nedb({ filename: './db/post.db', autoload: true });
// Import the 'path' package for handling and transforming file paths
const { resolve } = require('path');

// Constructing a post class with the included information in the constructor brackets 
class Post {
    constructor(itemDescription, numberHeld, location, image){
        this.itemDescription = itemDescription;
        this.numberHeld = numberHeld;
        this.location = location;
        this.image = image;
    }
    // Creates a post based on the parrameterrs provided
    create(itemDescription, numberHeld, location, image){
        const entry = {
            itemDescription: itemDescription,
            numberHeld: numberHeld,
            location: location,
            image: image,
        };
        // Insert the entry into the database
        postDB.insert(entry, function(err, newDoc) {
            if (err) console.log(err);
        });
    }
    // A function to get all posts from the database
    getAllPosts() {
        // Return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            // Use the find() function of the database to get the data,
            // Error first callback function, err for error, entries for data
            postDB.find({}, function(err, posts) {
                // If error occurs reject Promise
                if (err) {
                    reject(err);
                // If no error resolve the promise & return the data
                } else {
                    resolve(posts);
                    // To see what the returned data looks like
                    console.log('function all() returns: ', posts);
                }
            })
        })
    }
    // Method to remove a post by its ID
    removePost(postId) {
    // Returns a new Promise that can either be resolved or rejected 
    return new Promise((resolve, reject) => {
        // Calls the 'remove' function of the database to remove post by ID
        postDB.remove({_id: postId}, function(err, result) {
            // error handling
            if (err) {
                reject(err);
            } else {
                // If the removal is successful, the Promise is resolved and the result is passed on
                resolve(result);
            }
        });
    });
}

}
module.exports = Post;
