var express = require('express');
var router = express.Router();
var Blog = require("../models/blog");
var middleware = require("../middleware");

var topics = ["Technology", "Sports", "Music", "Gaming", "Entrepreneurship"];




/* show all Blogs. */
router.get('/', middleware.isLoggedIn ,function(req, res) {
    //get all blogs from DB
    Blog.find({}, function(err, allBlogs){
       if(err){
           console.log(err);
       }
       else{
           res.render("blogs/index", {blogs: allBlogs, topics: topics});
       }
    }).sort({$natural: -1});
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


// show blog route
router.get("/:id", function (req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
       if(err){
           console.log(err);
            res.redirect("/blogs");
       }
       else{
           res.render("blogs/show", {blog: foundBlog});
       }
    });
});



module.exports = router;
