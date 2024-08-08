const nedb = require('gray-nedb');
const postDB = new nedb({ filename: './db/post.db', autoload: true });

class Post {
    constructor(itemDescription, numberHeld, location, image){
        this.itemDescription = itemDescription;
        this.numberHeld = numberHeld;
        this.location = location;
        this.image = image;
    }

    create(isAdmin) {
        if (!isAdmin) {
            return Promise.reject(new Error('Only admins can create posts.'));
        }
        const entry = {
            itemDescription: this.itemDescription,
            numberHeld: this.numberHeld,
            location: this.location,
            image: this.image,
        };
        return new Promise((resolve, reject) => {
            postDB.insert(entry, function(err, newDoc) {
                if (err) reject(err);
                else resolve(newDoc);
            });
        });
    }

    static removePost(postId, isAdmin) {
        if (!isAdmin) {
            return Promise.reject(new Error('Only admins can remove posts.'));
        }
        return new Promise((resolve, reject) => {
            postDB.remove({_id: postId}, {}, function(err, numRemoved) {
                if (err) reject(err);
                else resolve(numRemoved);
            });
        });
    }

    static getAllPosts() {
        return new Promise((resolve, reject) => {
            postDB.find({}, function(err, posts) {
                if (err) reject(err);
                else resolve(posts);
            });
        });
    }
}

module.exports = Post;
