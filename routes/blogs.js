var express = require('express');
var router = express.Router();
var Blog = require("../models/blog");
var middleware = require("../middleware");

var topics = ["Technology", "Sports", "Music", "Gaming", "Entrepreneurship"];




/* show all Blogs. */
router.get('/', middleware.isLoggedIn ,function(req, res, next) {
    console.log(req.user);
    res.render("blogs/index", {topics:topics});
});

// new blog
router.get("/new",middleware.isLoggedIn, function (req, res) {
   res.render("blogs/new");
});

// create new blog
router.post("/", middleware.isLoggedIn , function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var image = req.body.image;
    var createdAt = Date.now();
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newBlog = {title: title, content: content, image: image, createdAt: createdAt, author: author};
    //create new blog and save to database
    Blog.create(newBlog, function (err, newlyCreatedBlog) {
       if(err){
           console.log(err);
       }
       else {
           console.log(newlyCreatedBlog);
           res.redirect("/blogs");
       }
    });
});

module.exports = router;
