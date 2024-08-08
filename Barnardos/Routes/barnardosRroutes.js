const express = require('express');
const router = express.Router();
const controller = require('../controllers/barnardosController.js');
const postController = require('../controllers/postController.js');

router.get(["/","Home","/Homepage"], controller.landing_page);

router.get("/about", controller.about_page);
router.get("/contact", controller.contact_page);
router.get("/home", controller.home_page);
router.get("/login", controller.login_page);
router.get("/signup", controller.signup_page);

router.use(function (req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
})
router.use(function (err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');

})

module.exports = router;