const express = require('express');
const app = express();
const path = require('path');
const Datastore = require('nedb');

app.use(function(req, res) {
    res.status(404);
    res.send('Oops! We didn\'t find what you are looking for.');
})

app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.'); 
})

const public = path.join(__dirname, 'public');
app.use(express.static(public));

require('dotenv').config(); // loads data from .env file
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

const router = require('./routes/barnardosRoutes');
app.use('/', router);

let db = new Datastore({ filename: './database/employee.db', autoload: true });

db.loadDatabase(function (err) {    // Callback is optional
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to employee db.');
    }
});
