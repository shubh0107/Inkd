var mongoose = require("mongoose");


var blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    createdAt: Date,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});


module.exports = mongoose.model("Blog", blogSchema);