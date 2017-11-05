var express = require('express');
var router = express.Router();
var Blog = require("../models/blog");
var Category = require("../models/category");
var middleware = require("../middleware");

//var topics = ["Technology", "Sports", "Music", "Gaming", "Entrepreneurship"];

var blogCategory;



/* show all Blogs with category. */
router.get('/', middleware.isLoggedIn, function (req, res) {
    //get all blogs from DB
    var categories ;
    Category.find({}, function (err, list) {
        if(err){
            console.log(err);
        }
        else{
            categories = list;
            console.log(list);
        }

    });


    Blog.find({}, function (err, allBlogs) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(allBlogs);
            res.render("blogs/index", {blogs: allBlogs, topics: categories});
        }
    });
});

/*show all Blogs for a category */
router.get("/category/:id", middleware.isLoggedIn, function (req, res) {
    var query = {"category.id": "ObjectId(" + req.params.id + ")"};
    Blog.find(query, function (err, allBlogs) {
        if (err) {
            console.log(err);
        } else {
            res.render("blogs/allblogs", {blogs: allBlogs});
        }
    });


});


// new blog
router.get("/new", middleware.isLoggedIn, function (req, res) {
    Category.find({}, function (err, category) {
        if (err) {
            console.log(err);
        } else {
            console.log(category);
            res.render("blogs/new", {categories: category});
        }
    });

});

// create new blog
router.post("/", middleware.isLoggedIn, function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var image = req.body.image;
    var createdAt = Date.now();
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var category_id = req.body.category;
    console.log("selected category's id:" + category_id);

    //find the id of the category selected by the user
    Category.findOne({'_id': category_id}, function (err, foundCategory) {
        if(err){
            console.log(err);
        }
        else{
        blogCategory = { id: category_id };
        console.log("Blog Id found: " + foundCategory._id);
        }

    });

    var newBlog = {
        title: title, content: content,
        image: image, createdAt: createdAt,
        author: author, blogCategory: blogCategory
    };

    //create new blog and save to database
    Blog.create(newBlog, function (err, newlyCreatedBlog) {
        if (err) {
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
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            console.log(err);
            res.redirect("/blogs");
        }
        else {
            res.render("blogs/show", {blog: foundBlog});
        }
    });
});


module.exports = router;
