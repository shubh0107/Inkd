var express = require('express');
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

/* root route */
router.get('/', function (req, res) {
    res.render("index", {title: "Inkd"});

});
//-------------
// Auth Routes
//-------------
// show signUp from
router.get("/register", function (req, res) {
    res.render("register");
});

// handling signup logic
router.post("/register", function (req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/blogs");
        });
    });
});


// show login form
router.get("/login", function (req, res) {
    res.render("login");
});

// handling Login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/blogs",
    failureRedirect: "/login"
}), function (req, res) {

});

// logout route
router.get("/logout", function(req, res)
{
    req.logout();
    res.redirect("/login");
});


module.exports = router;
