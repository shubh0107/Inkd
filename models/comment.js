var mongoose = require("mongoose");


var commentSchema = mongoose.Schema({
    text: String,
    createdAt: Date,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});


module.exports = mongoose.model("Comment", commentSchema);