var express = require('express');
var router = express.Router();

var topics = ["Technology", "Sports", "Music", "Gaming", "Entrepreneurship"];




/* GET All Blogs. */

router.get('/', function (req, res, next) {
    console.log(req.user);
    res.render("blogs/index", {topics:topics});
});

router.get("/new", function (req, res) {
   res.render("blogs/new");
});


module.exports = router;
