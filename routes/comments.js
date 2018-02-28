var express = require("express");
var router = express.Router({mergeParams: true});
var Comment = require("../models/comment");
var Blog = require("../models/blog");
var User = require("../models/user");
var middleware = require("../middleware");


//posting a new comment
router.post("/newComment", middleware.isLoggedIn, function (req, res) {

    //find the blog using id
    Blog.findById(req.params.id, function (err, foundBlog) {
        if(err){
            console.log(err);
        }
        else{
            console.log("Found blog is: "+foundBlog+"/n/n");

            var newComment = {
                text: req.body.commentText,
                createdAt: Date.now(),
                author: {
                    id: req.user._id,
                    username: req.user.username
                }
            };

            console.log("New comment is: "+newComment+"/n/n");

            //create the new comment
            Comment.create(newComment, function (err, newComment) {
               if(err){
                   console.log(err);
                   res.redirect("/blogs/"+req.params.id);
               }
               else{
                   //connect new comments to the blog
                   foundBlog.comments.push(newComment);
                   foundBlog.save();



                   /*    function(err, foundBlog){
                       Blog.find({}).populate('comments').exec(function(err, results) {
                           console.log("Results are --- "+results+"/n/n/n");
                       });
                   });

                   */
                   res.redirect("/blogs/"+foundBlog._id);
               }
            });
        }
    });
});


router.post("/")



module.exports = router;

