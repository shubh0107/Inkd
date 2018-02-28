var express = require("express");
var router = express.Router();
var Category = require("../models/category");
var middleware = require("../middleware/index");


/*show all Blogs for a category */
router.get("/:name", middleware.isLoggedIn, function (req, res) {
    var query = {"name": req.params.name};

    Category.find(query).populate("blogs").exec(function (err, list) {
        if (err) {
            console.log(err);
        } else {
            console.log(list[0]);
            res.render("blogs/category-blogs", {allCategories: list[0]});
        }
    });
});


module.exports = router;