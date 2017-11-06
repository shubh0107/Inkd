var express = require('express');
var router = express.Router();
var Blog = require("../models/blog");
var Category = require("../models/category");
var middleware = require("../middleware");
var moment = require("moment");



/* show all Blogs with category --  **INDEX PAGE** */
router.get('/', middleware.isLoggedIn, function (req, res) {
    //get all blogs from DB

    Category.find({}).populate("blogs").exec(function (err, list) {
        if (err) {
            console.log(err);
        } else {
            res.render("blogs/index", {allCategories: list});
            console.log("LIST---" + list);
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


    Category.find({}, {"name": 1, "_id": 1}, function (err, category) {
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

    var newBlog = {
        title: title, content: content,
        image: image, createdAt: createdAt,
        author: author
    };

    Blog.create(newBlog, function (err, newlyCreatedBlog) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("new blog :- ----",newlyCreatedBlog);
            Category.findById(req.body.category, function (err, foundCategory) {
                if (err) {
                    console.log("error: ", err);
                } else {
                    console.log("id:--------", newlyCreatedBlog._id);
                    foundCategory.blogs.push(newlyCreatedBlog._id);
                    foundCategory.save();
                    console.log("found----", foundCategory);
                }
            });
            res.redirect("/blogs");
        }
    });
});


// show blog route
router.get("/:id", function (req, res) {
    Blog.findById(req.params.id).populate("comments").exec(function (err, foundBlog) {
        if (err) {
            console.log(err);
            res.redirect("/blogs");
        }
        else {
            console.log(foundBlog);
            res.render("blogs/show", {blog: foundBlog});
        }
    });
});


module.exports = router;
