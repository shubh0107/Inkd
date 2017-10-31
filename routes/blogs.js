var express = require('express');
var router = express.Router();

var topics = ["Technology", "Sports", "Music", "Gaming", "Entrepreneurship"];




/* GET All Blogs. */

router.get('/', function (req, res, next) {
    res.render('blogs', {topics:topics});
});

module.exports = router;
