var mongoose = require("mongoose");


var blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    createdAt: Date,
    blogCategory : {
        id: {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Category"
        }
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});


module.exports = mongoose.model("Blog", blogSchema);